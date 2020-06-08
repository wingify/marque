## <img src="https://raw.githubusercontent.com/wingify/marque/master/marque.png" alt="Marque" style="border-radius: 50%;" width="50" height="50"/> Marque - Tag Versioning Helper

[![npm version](https://badge.fury.io/js/marque.svg)](https://www.npmjs.com/package/marque) [![npm](https://img.shields.io/npm/dt/marque.svg)](https://www.npmjs.com/package/marque)

[![NPM](https://nodei.co/npm/marque.png?downloads=true)](https://nodei.co/npm/marque/)

This open-source library helps in fetching and versioning the tags of your GIT repositories and Google Cloud Platform images. 

It can be used either inside a node repository or as a CLI tool.

### Requirements

- Node 7.0.0 or later
- Git or gcloud as per the usage

### Installation

It can be installed locally or globally or both as per different use cases. Local installation is preferred if this library will be used inside a node module. Global installation is preferred if it will be used as a CLI tool.

**For Local Repository**

```bash
# via npm
npm install marque

# via yarn
yarn add marque
```

**Global Installation**

```bash
# via npm
npm install -g marque

# via yarn
yarn global add marque
```

### Usage

As per the use case, this library can be used in multiple ways:

**Node Module**

It can be integrated with any Node.js service. It will return the incremented tag version based on the configuration.

```js
const marque = require('marque');

marque.increment({ type: 'git', version: 'minor' })
```

`Options:`

- `type`: Usage type i.e. _git_ or _gcloud_
- `version`: Version type to increment i.e. _major_, _minor_ or _patch_
- `imageName`: Image or resource name on gcloud. (Only for GCP)
- `limit`: Number of previous tags to fetch from gcloud to evaluate the latest tag. Normally this won't be required. (Only for GCP)

| Config Keys         | default        | accepts                      |
| ------------------- | -------------- | ---------------------------- |
| **type**            | git            | git or gcloud                |
| **version**         | patch          | major, minor or patch        |
| **imageName**       | undefined      | string                       |
| **limit**           | 10             | number                       |

<br></br>

**Command line interface**

It can be used in your terminal with interactive CLI just using the command:

```bash
marque
```


It can also be used directly using:

```bash
# GIT

marque git <version>

marque <version> # Can omit git as it's default
```

```bash
# Google Cloud Platform

marque gcloud <version> <image-name>

marque gcloud <version> <image-name> --limit=50 # with limit
```

**Tools like Jenkins**

```bash
newTag=$(marque gcloud <version> <image-name>)

if [[ $newTag == *"Error"* ]]; then
  exit 0
fi
```

### Third-party Resources and Credits

Refer [third-party-attributions.txt](https://github.com/wingify/marque/blob/master/third-party-attributions.txt)

### Authors

* [Punit Gupta](https://github.com/pntgupta)
* [Gaurav Nanda](https://github.com/gauravmuk)

### Contributing

Please go through our [contributing guidelines](https://github.com/wingify/marque/blob/master/CONTRIBUTING.md)

### Code of Conduct

[Code of Conduct](https://github.com/wingify/marque/blob/master/CODE_OF_CONDUCT.md)

### License

[MIT](https://github.com/wingify/marque/blob/master/LICENSE)
