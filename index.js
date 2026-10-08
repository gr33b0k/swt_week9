import express from "express";
import puppeteer from "puppeteer";
import appSrc from "./app.js";

const app = appSrc(express, puppeteer);

app.listen(process.env.PORT || 3000);
