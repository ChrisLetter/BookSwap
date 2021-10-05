// // jest.mock('@react-native-community/async-storage', () => {
// //   return {
// //     getItem: async (...args) => args,
// //     setItem: async (...args) => args,
// //     removeItem: async (...args) => args,
// //   };
// // });

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

console.log('jest.setup.js');