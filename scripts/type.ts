interface Gushi {
  /** 诗名 */
  title: string;
  /** 所属章节 */
  chapter: string;
  /** 片段 */
  section: string;
  /** 按行展示 */
  content: string[];
}

interface GushiFindResult {
  /** 对应古诗句子 */
  sentence: string;
  gushi: Gushi;
  /** 在古诗的 content 中，属于第几句 */
  index: number;
  /** 在源文件中，属于第几篇 */
  gushiIndex: number;
}
