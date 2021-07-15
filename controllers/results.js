const Student = require("../models/student");
const Narrative = require("../models/narrative");
const Category = require("../models/category");
const Result = require("../models/result");
const Analysis = require("../models/analysis");

module.exports = {
  index,
  show,
  analyze,
};

async function index(req, res) {
  const categories = await Category.find({});
  res.render("results/index.ejs", {
    title: "Results",
    navKey: "results",
    categories,
  });
}

async function analyze(req, res) {
  try {
    const narratives = await Narrative.find({});
    for (let narrative of narratives) {
      const studentId = narrative.student;
      const student = await Student.findById(studentId);
      const studentName = student.name;
      const narrativeText = narrative.text;
      const narrativeId = narrative._id;
      const assignedCategories = student.categories;

      const narrativeTextStripped = (narrativeText + ".")
        .replace(/\.{3}|\,|\;|:|\(|\)|\"|\`/gm, "") //removes commas, colons, semicolons, parentheses, quotes, and ellipses
        .replace(/\s+|-/gm, ` `) // reduces all multiple spaces or dashes to a single space
        .replace(/[\.!?]+/gm, `.`) //changes ! and ? to .
        .toLowerCase();

      const sentenceCount = (narrativeTextStripped.match(/\./g) || []).length;

      const narrativeAsArray = narrativeTextStripped
        .replace(/\./gm, ``)
        .split(" ")
        .map((word) => "" + word);

      const wordCount = narrativeAsArray.length;

      const wordCharmap = {};
      narrativeAsArray.forEach((word) => {
        word in wordCharmap ? wordCharmap[word]++ : (wordCharmap[word] = 1);
      });

      const result = await Result.find({ narrativeId });
      const resultObject = {
        studentId,
        studentName,
        narrativeText,
        narrativeId,
        assignedCategories,
        wordCharmap,
        wordCount,
        sentenceCount,
      };
      if (result.length > 0) {
        await Result.findByIdAndUpdate(result[0]._id, resultObject);
      } else {
        newResult = await Result.create(resultObject);
      }
    }

    const results = await Result.find({});

    const dimensions = Object.values(req.body);

    const arraysOfapplicableSubcategories = [];
    for (let i = 0; i < dimensions.length; i++) {
      let particularQuery = {};
      particularQuery.name = dimensions[i];
      let particularCategory = await Category.find(particularQuery);
      arraysOfapplicableSubcategories.push(particularCategory[0].subcategories);
    }
    const allPossibleCombinations = setProduct(
      ...arraysOfapplicableSubcategories
    );

    for (let combination of allPossibleCombinations) {
      let query = {};
      for (let i = 0; i < dimensions.length; i++) {
        query["assignedCategories." + dimensions[i]] = combination[i];
      }
      let appliedSubcategory = await Result.find(query);
      if (appliedSubcategory.length > 0) {
        let appliedSubcatSentenceMean =
          appliedSubcategory
            .map((x) => x.sentenceCount)
            .reduce((accumulator, currentValue) => accumulator + currentValue) /
          appliedSubcategory.length;
        let appliedSubcatSentenceMedian =
          appliedSubcategory.length % 2 === 1
            ? appliedSubcategory
                .map((x) => x.sentenceCount)
                .sort((a, b) => a - b)[(appliedSubcategory.length - 1) / 2]
            : (appliedSubcategory
                .map((x) => x.sentenceCount)
                .sort((a, b) => a - b)[(appliedSubcategory.length - 2) / 2] +
                appliedSubcategory
                  .map((x) => x.sentenceCount)
                  .sort((a, b) => a - b)[appliedSubcategory.length / 2]) /
              2;

        let appliedSubcatWordMean =
          appliedSubcategory
            .map((x) => x.wordCount)
            .reduce((accumulator, currentValue) => accumulator + currentValue) /
          appliedSubcategory.length;
        let appliedSubcatWordMedian =
          appliedSubcategory.length % 2 === 1
            ? appliedSubcategory.map((x) => x.wordCount).sort((a, b) => a - b)[
                (appliedSubcategory.length - 1) / 2
              ]
            : (appliedSubcategory.map((x) => x.wordCount).sort((a, b) => a - b)[
                (appliedSubcategory.length - 2) / 2
              ] +
                appliedSubcategory
                  .map((x) => x.wordCount)
                  .sort((a, b) => a - b)[appliedSubcategory.length / 2]) /
              2;

        let appliedSubcatwordCharmap = {};
        appliedSubcategory.forEach((result) => {
          for (let word in result.wordCharmap) {
            word in appliedSubcatwordCharmap
              ? (appliedSubcatwordCharmap[word] += result.wordCharmap[word])
              : (appliedSubcatwordCharmap[word] = result.wordCharmap[word]);
          }
        });

        const testAnalysis = await Analysis.find({
          dimensions: dimensions.join("&"),
          subcategories: combination,
        });

        const analysisObject = {
          dimensions: dimensions.join("&"),
          subcategories: combination,
          sentenceMean: appliedSubcatSentenceMean,
          sentenceMedian: appliedSubcatSentenceMedian,
          wordMean: appliedSubcatWordMean,
          wordMedian: appliedSubcatWordMedian,
          wordCharmap: appliedSubcatwordCharmap,
        };

        if (testAnalysis.length > 0) {
          await Analysis.findByIdAndUpdate(testAnalysis[0]._id, analysisObject);
        } else {
          newAnalysis = await Analysis.create(analysisObject);
        }
      }
    }

    res.redirect(`/results/${dimensions.join("&")}`);
  } catch (err) {
    res.send(err);
  }
}

async function show(req, res) {
  const analyses = await Analysis.find({ dimensions: req.params.id });
  let wordListMean = [];
  let wordListMedian = [];
  analyses.forEach((analysis) => {
    wordListMean = wordListMean.concat(Object.keys(analysis.wordCharmap));
  });
  wordListMean = [...new Set(wordListMean)].sort();

  res.render("results/show.ejs", {
    title: "Results",
    navKey: "results",
    wordListMean,
    analyses,
  });
}


//Auxillary Functions

function setProduct(...args) {
  let r = [],
    max = args.length - 1;
  function helper(arr, i) {
    for (let j = 0, l = args[i].length; j < l; j++) {
      let a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

function charMapper(results) {
  const wordList = {};
  for (let res of results) {
    for (let word in res.wordCharmap) {
      word in wordList ? wordList[word]++ : (wordList[word] = 1);
    }
  }
  return wordList;
}
