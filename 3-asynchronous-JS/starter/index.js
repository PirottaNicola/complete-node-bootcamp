const fs = require('fs');
const superagent = require('superagent'); //npm http requests library

//CALLBACK HELL!!!
// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//

//       console.log(res.body);
//       //se tutto ok, salvo l'url dell'immagine nel .txt
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('random dog image saved to file');
//         if (err) return console.error(err.message); //if error, return message
//       });
//     });
// });

//PROMISES (we are gonna "promisify" the previously written code)
//superagent library supports promises out of the box
// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) reject('could not find the file');
//       resolve(data); //data is the value that the Promise returns
//     });
//   });
// };

// const writeFilePro = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject('could not write the file');
//       resolve('success');
//     });
//   });
// };

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//every promise has to return a promise, so i can chain them!

//ASYNC AWAIT
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('could not find the file');
      resolve(data); //data is the value that the Promise returns
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write the file');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro('dog-img.txt', res.body.message);
    console.log('random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
};
getDogPic();
