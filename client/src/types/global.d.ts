// https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
declare module '*.ico' {
  const content: any;
  export default content;
}
