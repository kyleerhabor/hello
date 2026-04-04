import fs from "node:fs/promises";
import { dirname } from "node:path";
import * as v8 from "node:v8";
import {
  fileExists,
  key,
  unique,
  writeFile,
  KEY_SERVER_CONFIG_MEDIUMS,
  KEY_SERVER_CONFIG_MEDIUM_ID,
  KEY_SERVER_CONFIG_TITLES,
  KEY_SERVER_CONFIG_TITLE_ID,
  KEY_SERVER_CONFIG_TITLE_NAME,
  KEY_SERVER_CONFIG_TITLE_MEDIUM,
  KEY_SERVER_CONFIG_LOGS,
  KEY_SERVER_CONFIG_LOG_TITLE,
  KEY_SERVER_CONFIG_LOG_RATING,
} from "$lib/index";
import data from "$lib/assets/data.toml?raw";
import { getColor } from "colorthief";
import { findUp } from "find-up";
import { parse } from "smol-toml";
import * as R from "ramda";
import sharp from "sharp";

function logTitleName(titles, log) {
  return titles[log[KEY_SERVER_CONFIG_LOG_TITLE]][KEY_SERVER_CONFIG_TITLE_NAME];
}

/** @type {import('./$types').PageServerLoad]} */
export async function load(event) {
  const d = parse(data);
  const mediums = key(R.prop(KEY_SERVER_CONFIG_MEDIUM_ID), d[KEY_SERVER_CONFIG_MEDIUMS]);
  const titles = key(R.prop(KEY_SERVER_CONFIG_TITLE_ID), d[KEY_SERVER_CONFIG_TITLES]);
  const logs = unique(R.prop(KEY_SERVER_CONFIG_LOG_TITLE), d[KEY_SERVER_CONFIG_LOGS].toReversed())
    .sort((a, b) => b[KEY_SERVER_CONFIG_LOG_RATING] - a[KEY_SERVER_CONFIG_LOG_RATING] || logTitleName(titles, a).localeCompare(logTitleName(titles, b)));

  return { mediums, titles, logs };
}
