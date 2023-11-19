import { Request, Response } from "express";

export async function executeRoute(importURL: string) {
  try {
    const module = await import(importURL);

    return {
      component: module.default,
      loader: module.loader,
      action: module.action,
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
