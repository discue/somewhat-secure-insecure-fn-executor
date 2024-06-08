# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.4.0](https://github.com/discue/somewhat-secure-insecure-fn-executor/compare/v0.3.0...v0.4.0) (2024-06-08)


### Features

* catch compilation errors ([11675a3](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/11675a3cc3eef730661ea5674161d3e1b7bfe0e3))
* **script-runner:** add methods to only compile scripts ([aba8efe](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/aba8efedd9c52369d712e9728a9231805c1ebd6e))


### Chores

* add eslint comments when creating freeze-globals script ([6de6bf1](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/6de6bf142f4b7fdb2b116c5627ebfa3b1a2938aa))
* add run fn to custom lib functions ([aa72a3c](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/aa72a3c3fb6b9750f78436fe402ea2f73fedf7a5))
* **deps-dev:** bump eslint from 8.55.0 to 8.56.0 ([3082be7](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/3082be75aa1e4c0d21ec4c033814e936ab6d943b))
* **deps-dev:** bump eslint from 8.56.0 to 8.57.0 ([22f801e](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/22f801e6022eac8ccaa6a54e5a41b83f2c2a880d))
* **deps-dev:** bump mocha from 10.2.0 to 10.3.0 ([a48286e](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/a48286e5d0a00fd8e19d264345051423dfa962d7))
* **deps-dev:** bump mocha from 10.3.0 to 10.4.0 ([4cce4d2](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/4cce4d2aef3457790a5d8203499bf452f616e342))
* **deps-dev:** bump nodemon from 3.0.1 to 3.0.2 ([80382be](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/80382be629492a39d25ed11faab8373bbf60663e))
* **deps-dev:** bump nodemon from 3.0.2 to 3.0.3 ([5b87814](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/5b87814a8664470d248b902e908932d37180bffe))
* **deps-dev:** bump nodemon from 3.0.3 to 3.1.0 ([ba0fc8b](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ba0fc8bbd90bad62b32485d18156fbe07dce01fb))
* **deps-dev:** bump typescript from 5.3.2 to 5.3.3 ([d9811a9](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/d9811a907fe8873ad7d1efc20379ca1c783e0c78))
* **deps-dev:** bump typescript from 5.3.3 to 5.4.3 ([57943ed](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/57943ed2c979b3ea042db125e56e0b7f661c6443))
* **deps-dev:** update dependencies ([bf70fff](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/bf70ffff696dba7b1621a0f04fbc926d69ff8d08))
* **deps:** bump actions/stale from 8 to 9 ([7aea9d5](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/7aea9d52b063e82e3506f6e204a1d204e3f85945))
* **deps:** bump isolated-vm from 4.6.0 to 4.7.2 ([5de8636](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/5de86367797d8ec8e6d790bc5f614a24904fc76b))
* **deps:** install jsdoc comment plugin ([30392ff](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/30392ffd02f09586175511e375a65600ddaf297a))
* **deps:** update isolated-vm ([38ec2ec](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/38ec2ec8b573def105127292b65783a7fec7f768))
* document correct type of error stack property ([49ad3b8](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/49ad3b884cde1e6683d9d7399ff8fac01a693345))
* freeze also global object ([7f60889](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/7f60889c5c5b4c9f6642a9cacbe7edf744e03d8e))
* make sure run function is also frozen ([96c66e9](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/96c66e94a2513416046b392b4f22cd4807bf0dd4))
* remove method from main exports ([38dfe11](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/38dfe1125c4f69ec79f5393a5a9aa3089d446da4))
* update readme ([21b9442](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/21b94423c40dee8bafb4121d3eb2c5344027d37b))
* update stack line offset if script will be wrapped ([5e74c06](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/5e74c06dde1c247d791505e1b63b211860b401bc))
* use new eslint version and config ([857d695](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/857d695b4e42abf2f69c6b663782057a4e0dec4c))


### Refactorings

* add console proxy to global environment ([9ee183f](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/9ee183f009909154d070156aec77537328742666))
* add script runner to isolated environment always ([1823382](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/18233826c6d7839c32e258e76ff487873274bc5b))
* call exposed run function to execute userprovided script ([736ba1a](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/736ba1a4c30b85e500dbd0329072ae312ddab986))
* create dedicate files for running and compiling scripts ([edf34c6](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/edf34c65a674e97fb03f6559015104846b8d20e4))
* initialize error with values ([38e92aa](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/38e92aaffcbfb25b8ed24da2328899ddcc412bef))
* initialize variables in oneline ([e6907b3](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/e6907b30d8fd3021331847bd0f73f0c160e571e4))
* move runtime setup logic to isolate module ([bde5c0b](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/bde5c0b70a2114ded6fdb588ecd820053294e098))
* name script runner methods ([4e0224a](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/4e0224af02be610329e3975b42206587a2900cd7))
* pass collectAndReleaseRefs as options to requestor of isolate ([0bccac2](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/0bccac2b0902c5911516e9ba19d8e574056d4bc1))
* pass only single object to unsafe script ([ccb09e3](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ccb09e3177064b3c2281faa010f9aed94534f556))
* rename isolate methods ([a3fa29f](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/a3fa29f6cb404910ae83c29bfd86701f16422e3e))
* rename local variables of main export ([ae492ac](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ae492ac30ac7e8e1e937f4a66e7b74dda4699c27))
* rename runScript to installScript for better clarity ([28024aa](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/28024aa2c3495fd682211c06eb915ddefb5d18a5))
* rename variable console to logs ([79d73b7](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/79d73b7eccd1128f6e9d79735bdffae3bdb1b2f2))
* wrap user script in compiler function ([1140bca](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/1140bca1a83da24c3c40a3b476aeec7b20367599))

## [0.3.0](https://github.com/discue/somewhat-secure-insecure-fn-executor/compare/v0.2.0...v0.3.0) (2023-12-04)


### Bug Fixes

* scripts cannot be resolved when used as module ([a262bf2](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/a262bf27bcb05f6c53236eda16074ca08e8797cc))


### Chores

* publish only lib folder and license ([cb6b5e3](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/cb6b5e38abfc7fb48f894382f23ff824f2167267))

## [0.2.0](https://github.com/discue/somewhat-secure-insecure-fn-executor/compare/v0.1.0...v0.2.0) (2023-12-04)


### Features

* remove whitespace before stack trace lines ([4507068](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/4507068fa34bc09e956b9402dfad2331474f0271))


### Bug Fixes

* args must be provided as array to internals ([c079ba9](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/c079ba9dd0fe14716f860c7b3119a0ed7d0c3e84))


### Chores

* document nodejs globals are not available ([d6cb201](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/d6cb201e80a56c64b2d97f30cf56414c9583eb75))
* update mocha command to run tests recursively ([23990e1](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/23990e1dc171c3df5e75489ece39b3ab471b303a))

## 0.1.0 (2023-12-04)


### Features

* add isolate script ([4c2402b](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/4c2402b9168ff8131b4602e853b9d30d0b97aa3d))
* add module entry point ([bc8c5f7](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/bc8c5f7981d2374364ae7ec29294452e076b810b))
* add object helper scripts ([d4b1f30](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/d4b1f309157b01538f8825da9fb2f8609679dd28))
* add script for base encoding and decoding ([954c06a](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/954c06ada17b78cfa3ea13fa31be36c50388d0b3))
* allow customizatino of fn arg names ([3b82941](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/3b82941ea99d3896f5a053bc226cc4f87c177218))
* do not allow exec of eval, Function, WebAssembly ([8c1f5d0](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/8c1f5d0e4f46307ad3b691efe1f3b0832cf2d80f))
* enforce strict mode for user provided scripts ([2fe5d61](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/2fe5d61dd23cc0037a55ecd1f949d9f9b8c8c05c))
* ensure stack trace line numbers and script names are readable ([e8d95a0](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/e8d95a09fcf8cdc72b1c3833889321bc0801382f))
* freeze all globals objects before script execution ([aa1c6f5](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/aa1c6f52da737a8883ef1e522cc5511384bd432d))
* **isolate:** return return value from callback ([0f8adcc](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/0f8adcc827ba63774e7ce9cd8b83d38ecb3002de))


### Chores

* add changelog creation script ([2e403b4](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/2e403b44203202f20d654680ebf57a90fa080b0c))
* add checkout script for model training ([f9ed75c](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/f9ed75c729404897a1e2957548e3d343d0013206))
* add code coverage script ([0330d7d](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/0330d7df58f4b4bfb0b3c5db9057d9d4fb2f8b47))
* add config for changelog ([587113d](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/587113d0846f63c9062d9c618ea32cc6169970e0))
* add console proxy script ([3dd62e1](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/3dd62e10b3fc4b7197e294a57b77161fb430c330))
* add eslint config ([e869065](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/e86906561023854ccb99f3ac8056fc6ce279f346))
* add functions to setup helpers in isolates ([7120ccc](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/7120ccce4c46c00fbfd34b902d74add77241c1be))
* add github workflows ([fe6bc7a](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/fe6bc7a8f04dea958361e12e50876cbb05ffc51f))
* add gitignore ([0ff4875](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/0ff487507cc9bdc3f391fddaaaaca9bf520237e0))
* add license ([cfdff4b](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/cfdff4bc915589598776566cbd02decb8a6d4e37))
* add package files ([adcd254](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/adcd254df02859bd35b4cde993e2c3f28c045448))
* add package scripts ([6c7f538](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/6c7f538226825267553bb950e4d008f94756dfc6))
* add readme ([1b68432](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/1b6843204d0a328213c4897c92087c639403415d))
* add script handler runner ([633ac86](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/633ac8654d66ef82d0f29655d22d10a35447820c))
* add script runner ([0f58ad4](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/0f58ad48ca90ba683a91a632b649e3e6702073c6))
* add test script ([ec76523](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ec76523eae4ef01f5c1669bf9509a1258964682a))
* add test setup script ([f6a5951](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/f6a5951cf72ce81e5efa5ebca79c2c80987ed296))
* add workflow for model training ([509ffdd](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/509ffdde44f87a327dd12bc70d88d83e7fe40662))
* add wrapper for user provided script ([210bd57](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/210bd5708d43e28d1b37aa1917a707eb551e34d2))
* **ci:** update name of test concurrency group ([d86b2fd](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/d86b2fd205ea611eb0ea9fa47b6b3ee6e6e36bd0))
* **deps-dev:** bump eslint from 8.52.0 to 8.55.0 ([f435097](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/f4350976e8370829ad6ba89e6c239ad297c3f736))
* **deps:** bump actions/setup-node from 3 to 4 ([4f02d88](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/4f02d88dc3f471cd094d73083b29ab27456c6391))
* **deps:** fixup ([553d7db](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/553d7db492ad7ff6fe4bb94aacd7b64f0d2a625d))
* **deps:** install js encode libs ([ad89892](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ad89892340d3d4134cda7b26d5c05c06225edac3))
* **deps:** install tsc to compile types ([248ea1b](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/248ea1be2bb64d5a08cb542de7af4fb59770fc6d))
* **deps:** remove ml training dependencies ([a4fba6d](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/a4fba6df0f2f69862d4add78ff55706d87477837))
* freeze also Promise ([c81f456](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/c81f456813e179d611be0ba36baac021d836996c))
* freeze also String object ([5bdd2e5](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/5bdd2e58017d64bcc5348715272cf888befb164d))
* install standard-version ([ef982b2](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ef982b24dd45172fc989e602ad984b568b090d23))
* remove ml training scripts ([5421f84](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/5421f84006409ad7eba1457a2d46ff949112d8e3))
* remove training workflow ([ec4a4b3](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ec4a4b35e631d93ecbb640a243f82cc15f53f73d))
* rename function param name ([37794e2](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/37794e2779106e68c1af29e3f7b362a4522d40c5))
* rename user provided fn again ([c86d56d](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/c86d56dbebca1b3623275ba499a991391f282912))
* return stack trace as array ([548d0d5](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/548d0d509264f0e1ce1fe2e8024f4422ed27ac48))
* return undefined if no result or no error set ([d030852](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/d03085213d4f31e3a0602ddc93a45ec7c48b35db))
* **training:** add categories ([82931eb](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/82931eb359d0562204ec590a2acfce29a45679bf))
* **training:** add encoding scripts ([050f35c](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/050f35ceba99858cfe42c2482e8bb23add96af23))
* **training:** add js stopwords ([ccbbbc0](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/ccbbbc038e86c3b6329601cce1ebe83c11f736a1))
* **training:** add script for training with classify ([aaf3913](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/aaf3913144fed726fb5715eab2fafcdb1a5be20a))
* udpate freeze globals script ([87cb74b](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/87cb74be364c4b2183ea88a4d394b9ad174991a5))
* update gitignore ([29cd7e1](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/29cd7e11f054b85613a18ec40672c1e579649cf6))
* update gitignore ([be48c62](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/be48c6268df49ea4f3eac693dfbb1b17c67d497d))
* update helper script names ([50399df](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/50399df82aae086ab383bcd780473d964f80acd6))
* update jsdoc for main function ([3fc9965](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/3fc996564b7f05f06d8932b97b8ffee14337bc79))
* update list frozen objects ([061126c](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/061126c8d6d36a932f6ab3a4b2d140a3cd14c83d))
* update name of user function ([8e49aef](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/8e49aef6428626f46c7bf0d303212bf600f63132))
* update readme ([d2bc2e1](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/d2bc2e114cbe8e31d7a1c0a917f79f1540fe7ed3))
* update readme ([b511a1b](https://github.com/discue/somewhat-secure-insecure-fn-executor/commit/b511a1b246a19975c90556e4e3992153d7bf84af))
