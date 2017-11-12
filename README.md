# generator-baucis [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Awesome Baucis api generator.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-baucis using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
sudo npm i -g yo generator-baucis
```

Then generate your new project:

```bash
yo baucis
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## About the structure

* The logic of your application should be contained in these folders:
```
lib/
├── decorators
│   ├── index.js
│   └── user.js
├── logger.js
├── models
│   ├── index.js
│   ├── schemas
│   │   └── user-schema.js
│   └── user.js
└── routes
    ├── auth.js
    ├── extract-jwt.js
    ├── home.js
    ├── index.js
    └── users.js
```
* configuration:
```
config/
└── public.js
.env
```

### Custom routes, decorators models
in each folder we can add new files but they must be exported in the index.js and match the decorator name with the mongoose models
## Examples
by default the generator provides sample files: models, decorators and custom routes

## Support

Node v4 or higger

## Changelog

* v0.1.5 - bugfix auth route and favico, update mongoose connection.
* v0.1.0 or higger support jwt validation.
* v0.2.1 update yeoman generator, bugfix and remove unnecessary dependencies
## License

MIT © [ivanhuay]()


[npm-image]: https://badge.fury.io/js/generator-baucis.svg
[npm-url]: https://npmjs.org/package/generator-baucis
[travis-image]: https://travis-ci.org/ideasdelivery/generator-baucis.svg?branch=master
[travis-url]: https://travis-ci.org/ideasdelivery/generator-baucis
[daviddm-image]: https://david-dm.org/ideasdelivery/generator-baucis.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ideasdelivery/generator-baucis
