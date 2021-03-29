// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dnaArray) => {
  return {
    specimenNum: specimenNum,
    dna: dnaArray,

    mutate() {
      let i = Math.floor(Math.random() * this.dna.length);

      let rando = returnRandBase();

      while (rando === this.dna[i]) {
        rando = returnRandBase();
      }

      this.dna[i] = rando;
    },
    compareDNA(pAequor) {
      let commonDNA = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i])
          commonDNA++;
      }
      commonDNA = Math.floor((commonDNA / this.dna.length) * 100);
      console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${commonDNA}% shared DNA.`)
    },
    willLikelySurvive() {
      let survivalOdd = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G')
          survivalOdd++;
      }
      survivalOdd = (survivalOdd / this.dna.length) * 100;

      if (survivalOdd >= 60) {
        return true;
      } else {
        return false;
      }
    }
  }
};


const generateTestBatch = () => {
  let testBatch = [];
  let i = 1;
  let p = pAequorFactory(i, mockUpStrand());

  while (i <= 30) {
    p = pAequorFactory(i, mockUpStrand());
    if (p.willLikelySurvive() === true) {
      testBatch.push(p);
      i++;
    }
  }
  return testBatch;
};


//let sample1 = pAequorFactory(1, mockUpStrand());
//let sample2 = pAequorFactory(2, mockUpStrand());
//console.log(sample1);
//console.log(sample2);
//sample1.compareDNA(sample2);
//sample1.mutate();
//sample1.compareDNA(sample2);
//console.log(sample1.willLikelySurvive());

console.log(generateTestBatch());