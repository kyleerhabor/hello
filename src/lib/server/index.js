import data from "$lib/config.toml?raw";
import * as R from "ramda";
import toml from "smol-toml";

// Resources
export const KEY_DATA_RESOURCES = "data.resources";
export const KEY_DATA_RESOURCE_ID = "data.resource.id";
export const KEY_DATA_RESOURCE_VALUE = "data.resource.value";

// Date statuses
export const KEY_DATA_DATE_STATUSES = "data.date-statuses";
export const KEY_DATA_DATE_STATUS_ID = "data.date-status.id";
export const KEY_DATA_DATE_STATUS_VALUE = "data.date-status.value";

// Mediums
export const KEY_DATA_MEDIUMS = "data.mediums";
export const KEY_DATA_MEDIUM_ID = "data.medium.id";
export const KEY_DATA_MEDIUM_VALUE = "data.medium.value";

// Localizations
export const KEY_DATA_LOCALIZATIONS = "data.localizations";
export const KEY_DATA_LOCALIZATION_ID = "data.localization.id";
export const KEY_DATA_LOCALIZATION_MESSAGES = "data.localization.messages";
export const KEY_DATA_LOCALIZATION_MESSAGE_LOCALIZATION = "data.localization.message.localization";
export const KEY_DATA_LOCALIZATION_MESSAGE_LOCALE = "data.localization.message.locale";
export const KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE = "data.localization.message.message";

// CV
export const KEY_DATA_CV_NAME = "data.cv.name";
export const KEY_DATA_CV_TITLE = "data.cv.title";

// CV Contacts
export const KEY_DATA_CV_CONTACTS = "data.cv.contacts";
export const KEY_DATA_CV_CONTACT_RESOURCE = "data.cv.contact.resource";
export const KEY_DATA_CV_CONTACT_RESOURCE_EMAIL_ADDRESS = "data.cv.contact.resource.email.address";
export const KEY_DATA_CV_CONTACT_RESOURCE_GITHUB_USER_USERNAME = "data.cv.contact.resource.github-user.username";
export const KEY_DATA_CV_CONTACT_RESOURCE_LINKEDIN_USERNAME = "data.cv.contact.resource.linkedin.username";

// CV Experience
export const KEY_DATA_CV_EXPERIENCES = "data.cv.experiences";
export const KEY_DATA_CV_EXPERIENCE_TITLE = "data.cv.experience.title";
export const KEY_DATA_CV_EXPERIENCE_ORGANIZATION = "data.cv.experience.organization";
export const KEY_DATA_CV_EXPERIENCE_LOCATION = "data.cv.experience.location";
export const KEY_DATA_CV_EXPERIENCE_START_DATE = "data.cv.experience.start-date";
export const KEY_DATA_CV_EXPERIENCE_START_DATE_STATUS = "data.cv.experience.start-date-status";
export const KEY_DATA_CV_EXPERIENCE_END_DATE = "data.cv.experience.end-date";
export const KEY_DATA_CV_EXPERIENCE_END_DATE_STATUS = "data.cv.experience.end-date-status";

// CV Activities
export const KEY_DATA_CV_ACTIVITIES = "data.cv.activities";
export const KEY_DATA_CV_ACTIVITY_TITLE = "data.cv.activity.title";
export const KEY_DATA_CV_ACTIVITY_ORGANIZATION = "data.cv.activity.organization";
export const KEY_DATA_CV_ACTIVITY_LOCATION = "data.cv.activity.location";
export const KEY_DATA_CV_ACTIVITY_START_DATE = "data.cv.activity.start-date";
export const KEY_DATA_CV_ACTIVITY_START_DATE_STATUS = "data.cv.activity.start-date-status";
export const KEY_DATA_CV_ACTIVITY_END_DATE = "data.cv.activity.end-date";
export const KEY_DATA_CV_ACTIVITY_END_DATE_STATUS = "data.cv.activity.end-date-status";

// CV Projects
export const KEY_DATA_CV_PROJECTS = "data.cv.projects";
export const KEY_DATA_CV_PROJECT_ID = "data.cv.project.id";
export const KEY_DATA_CV_PROJECT_NAME = "data.cv.project.name";
export const KEY_DATA_CV_PROJECT_START_DATE = "data.cv.project.start-date";
export const KEY_DATA_CV_PROJECT_START_DATE_STATUS = "data.cv.project.start-date-status";
export const KEY_DATA_CV_PROJECT_END_DATE = "data.cv.project.end-date";
export const KEY_DATA_CV_PROJECT_END_DATE_STATUS = "data.cv.project.end-date-status";

// CV Project Links
export const KEY_DATA_CV_PROJECT_LINKS = "data.cv.project.links";
export const KEY_DATA_CV_PROJECT_LINK_PROJECT = "data.cv.project.link.project";
export const KEY_DATA_CV_PROJECT_LINK_RESOURCE = "data.cv.project.link.resource";
export const KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_USERNAME = "data.cv.project.link.resource.github-repository.username";
export const KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_REPOSITORY = "data.cv.project.link.resource.github-repository.repository";

// CV Educations
export const KEY_DATA_CV_EDUCATIONS = "data.cv.educations";
export const KEY_DATA_CV_EDUCATION_ID = "data.cv.education.id";
export const KEY_DATA_CV_EDUCATION_ORGANIZATION = "data.cv.education.organization";
export const KEY_DATA_CV_EDUCATION_LOCATION = "data.cv.education.location";
export const KEY_DATA_CV_EDUCATION_DEGREE = "data.cv.education.degree";
export const KEY_DATA_CV_EDUCATION_START_DATE = "data.cv.education.start-date";
export const KEY_DATA_CV_EDUCATION_START_DATE_STATUS = "data.cv.education.start-date-status";
export const KEY_DATA_CV_EDUCATION_END_DATE = "data.cv.education.end-date";
export const KEY_DATA_CV_EDUCATION_END_DATE_STATUS = "data.cv.education.end-date-status";

// CV Education Majors
export const KEY_DATA_CV_EDUCATION_MAJORS = "data.cv.education.majors";
export const KEY_DATA_CV_EDUCATION_MAJOR_EDUCATION = "data.cv.education.major.education";
export const KEY_DATA_CV_EDUCATION_MAJOR_NAME = "data.cv.education.major.name";

// CV Education Minors
export const KEY_DATA_CV_EDUCATION_MINORS = "data.cv.education.minors";
export const KEY_DATA_CV_EDUCATION_MINOR_EDUCATION = "data.cv.education.minor.education";
export const KEY_DATA_CV_EDUCATION_MINOR_NAME = "data.cv.education.minor.name";

// Titles
export const KEY_DATA_TITLES = "data.titles";
export const KEY_DATA_TITLE_ID = "data.title.id";
export const KEY_DATA_TITLE_NAME = "data.title.name";
export const KEY_DATA_TITLE_MEDIUM = "data.title.medium";

// Title Links
export const KEY_DATA_TITLE_LINKS = "data.title.links";
export const KEY_DATA_TITLE_LINK_TITLE = "data.title.link.title";
export const KEY_DATA_TITLE_LINK_RESOURCE = "data.title.link.resource";
export const KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ANIME_ID = "data.title.link.resource.anidb-anime.id";
export const KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_SERIES_ID = "data.title.link.resource.mangaupdates-series.id";
export const KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SERIES_SLUG = "data.title.link.resource.novelupdates-series.slug";
export const KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID = "data.title.link.resource.mydramalist.id";

// Logs
export const KEY_DATA_LOGS = "data.logs";
export const KEY_DATA_LOG_TITLE = "data.log.title";
export const KEY_DATA_LOG_RATING = "data.log.rating";

const parseData = R.once(() => toml.parse(data));

export function parseConfig() {
  return parseData();
}

export const resource = R.curry((id, resources) => R.path([id, KEY_DATA_RESOURCE_VALUE], resources));
export const dateStatus = R.curry((id, statuses) => R.path([id, KEY_DATA_DATE_STATUS_VALUE], statuses));
export const medium = R.curry((id, mediums) => R.path([id, KEY_DATA_MEDIUM_VALUE], mediums));