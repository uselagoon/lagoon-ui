/* eslint no-extend-native: 0 */
import find from 'core-js/es/array/virtual/find';
import findIndex from 'core-js/es/array/virtual/find-index';
import ArrayIncludes from 'core-js/es/array/virtual/includes';
import assign from 'core-js/es/object/assign';
import StringIncludes from 'core-js/es/string/virtual/includes';
import startsWith from 'core-js/es/string/virtual/starts-with';

String.prototype.includes = StringIncludes;
String.prototype.startsWith = startsWith;
Array.prototype.includes = ArrayIncludes;
Array.prototype.find = find;
Array.prototype.findIndex = findIndex;
Object.assign = assign;
