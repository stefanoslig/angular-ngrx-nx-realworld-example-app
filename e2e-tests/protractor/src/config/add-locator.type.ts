import { Locator } from 'protractor/built/locators';

declare module 'protractor' {
  interface ProtractorBy {
    e2eId(id: string, parentId?: string): Locator;
  }
}
