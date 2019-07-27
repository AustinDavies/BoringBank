import Vue from 'vue';
import { isNumber } from 'lodash';

Vue.filter('usd', (val: number) => {
  if (!isNumber(val)) return null;
  let formattedVal = `$${val.toFixed(2)}`;
  if (val < 0) formattedVal = `-${formattedVal}`;
  return formattedVal;
});
