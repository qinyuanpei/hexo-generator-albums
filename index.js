/* global hexo */
'use strict';

hexo.extend.generator.register('works', require('./lib/albums-generator'));