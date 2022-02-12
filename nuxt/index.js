import { resolve } from 'path';


export default function(moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vuex-snackbars.js',
    mode: 'client',
    ssr: false,
  });
};
