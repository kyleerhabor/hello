import data from "$lib/server/resources/data.toml?raw";
import * as R from "ramda";
import toml from "smol-toml";

// Resources
export const KEY_DATA_RESOURCES = "resources";
export const KEY_DATA_RESOURCE_ID = "resource.id";
export const KEY_DATA_RESOURCE_VALUE = "resource.value";

// Date statuses
export const KEY_DATA_DATE_STATUSES = "date-statuses";
export const KEY_DATA_DATE_STATUS_ID = "date-status.id";
export const KEY_DATA_DATE_STATUS_VALUE = "date-status.value";

// Mediums
export const KEY_DATA_MEDIUMS = "mediums";
export const KEY_DATA_MEDIUM_ID = "medium.id";
export const KEY_DATA_MEDIUM_VALUE = "medium.value";

// Localizations
export const KEY_DATA_LOCALIZATIONS = "localizations";
export const KEY_DATA_LOCALIZATION_ID = "localization.id";
export const KEY_DATA_LOCALIZATION_MESSAGES = "localization.messages";
export const KEY_DATA_LOCALIZATION_MESSAGE_LOCALIZATION = "localization.message.localization";
export const KEY_DATA_LOCALIZATION_MESSAGE_LOCALE = "localization.message.locale";
export const KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE = "localization.message.message";

// CV
export const KEY_DATA_CV_NAME = "cv.name";
export const KEY_DATA_CV_TITLE = "cv.title";
export const KEY_DATA_CV_LOCATION = "cv.location";

// CV Contacts
export const KEY_DATA_CV_CONTACTS = "cv.contacts";
export const KEY_DATA_CV_CONTACT_RESOURCE = "cv.contact.resource";
export const KEY_DATA_CV_CONTACT_RESOURCE_EMAIL_ADDRESS = "cv.contact.resource.email.address";
export const KEY_DATA_CV_CONTACT_RESOURCE_GITHUB_USER_USERNAME = "cv.contact.resource.github-user.username";
export const KEY_DATA_CV_CONTACT_RESOURCE_LINKEDIN_USERNAME = "cv.contact.resource.linkedin.username";

// CV Experience
export const KEY_DATA_CV_EXPERIENCES = "cv.experiences";
export const KEY_DATA_CV_EXPERIENCE_TITLE = "cv.experience.title";
export const KEY_DATA_CV_EXPERIENCE_ORGANIZATION = "cv.experience.organization";
export const KEY_DATA_CV_EXPERIENCE_LOCATION = "cv.experience.location";
export const KEY_DATA_CV_EXPERIENCE_START_DATE = "cv.experience.start-date";
export const KEY_DATA_CV_EXPERIENCE_START_DATE_STATUS = "cv.experience.start-date-status";
export const KEY_DATA_CV_EXPERIENCE_END_DATE = "cv.experience.end-date";
export const KEY_DATA_CV_EXPERIENCE_END_DATE_STATUS = "cv.experience.end-date-status";

// CV Activities
export const KEY_DATA_CV_ACTIVITIES = "cv.activities";
export const KEY_DATA_CV_ACTIVITY_TITLE = "cv.activity.title";
export const KEY_DATA_CV_ACTIVITY_ORGANIZATION = "cv.activity.organization";
export const KEY_DATA_CV_ACTIVITY_LOCATION = "cv.activity.location";
export const KEY_DATA_CV_ACTIVITY_START_DATE = "cv.activity.start-date";
export const KEY_DATA_CV_ACTIVITY_START_DATE_STATUS = "cv.activity.start-date-status";
export const KEY_DATA_CV_ACTIVITY_END_DATE = "cv.activity.end-date";
export const KEY_DATA_CV_ACTIVITY_END_DATE_STATUS = "cv.activity.end-date-status";

// CV Projects
export const KEY_DATA_CV_PROJECTS = "cv.projects";
export const KEY_DATA_CV_PROJECT_ID = "cv.project.id";
export const KEY_DATA_CV_PROJECT_NAME = "cv.project.name";
export const KEY_DATA_CV_PROJECT_START_DATE = "cv.project.start-date";
export const KEY_DATA_CV_PROJECT_START_DATE_STATUS = "cv.project.start-date-status";
export const KEY_DATA_CV_PROJECT_END_DATE = "cv.project.end-date";
export const KEY_DATA_CV_PROJECT_END_DATE_STATUS = "cv.project.end-date-status";

// CV Project Links
export const KEY_DATA_CV_PROJECT_LINKS = "cv.project.links";
export const KEY_DATA_CV_PROJECT_LINK_PROJECT = "cv.project.link.project";
export const KEY_DATA_CV_PROJECT_LINK_RESOURCE = "cv.project.link.resource";
export const KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_USERNAME = "cv.project.link.resource.github-repository.username";
export const KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_REPOSITORY = "cv.project.link.resource.github-repository.repository";

// CV Educations
export const KEY_DATA_CV_EDUCATIONS = "cv.educations";
export const KEY_DATA_CV_EDUCATION_ID = "cv.education.id";
export const KEY_DATA_CV_EDUCATION_ORGANIZATION = "cv.education.organization";
export const KEY_DATA_CV_EDUCATION_LOCATION = "cv.education.location";
export const KEY_DATA_CV_EDUCATION_DEGREE = "cv.education.degree";
export const KEY_DATA_CV_EDUCATION_START_DATE = "cv.education.start-date";
export const KEY_DATA_CV_EDUCATION_START_DATE_STATUS = "cv.education.start-date-status";
export const KEY_DATA_CV_EDUCATION_END_DATE = "cv.education.end-date";
export const KEY_DATA_CV_EDUCATION_END_DATE_STATUS = "cv.education.end-date-status";

// CV Education Majors
export const KEY_DATA_CV_EDUCATION_MAJORS = "cv.education.majors";
export const KEY_DATA_CV_EDUCATION_MAJOR_EDUCATION = "cv.education.major.education";
export const KEY_DATA_CV_EDUCATION_MAJOR_NAME = "cv.education.major.name";

// CV Education Minors
export const KEY_DATA_CV_EDUCATION_MINORS = "cv.education.minors";
export const KEY_DATA_CV_EDUCATION_MINOR_EDUCATION = "cv.education.minor.education";
export const KEY_DATA_CV_EDUCATION_MINOR_NAME = "cv.education.minor.name";

// Titles
export const KEY_DATA_TITLES = "titles";
export const KEY_DATA_TITLE_ID = "title.id";
export const KEY_DATA_TITLE_NAME = "title.name";
export const KEY_DATA_TITLE_MEDIUM = "title.medium";

// Title Links
export const KEY_DATA_TITLE_LINKS = "title.links";
export const KEY_DATA_TITLE_LINK_TITLE = "title.link.title";
export const KEY_DATA_TITLE_LINK_RESOURCE = "title.link.resource";
export const KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ANIME_ID = "title.link.resource.anidb-anime.id";
export const KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_SERIES_ID = "title.link.resource.mangaupdates-series.id";
export const KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SERIES_SLUG = "title.link.resource.novelupdates-series.slug";
export const KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID = "title.link.resource.mydramalist.id";

// Logs
export const KEY_DATA_LOGS = "logs";
export const KEY_DATA_LOG_TITLE = "log.title";
export const KEY_DATA_LOG_RATING = "log.rating";

// Articles
export const KEY_DATA_ARTICLES = "articles";
export const KEY_DATA_ARTICLE_ID = "article.id";
export const KEY_DATA_ARTICLE_TITLE = "article.title";
export const KEY_DATA_ARTICLE_DATE = "article.date";
export const KEY_DATA_ARTICLE_DESCRIPTION = "article.description";
export const KEY_DATA_ARTICLE_CONTENT = "article.content";

export const parseData = R.once(() => toml.parse(data));
export const resource = R.curry((id, resources) => R.path([id, KEY_DATA_RESOURCE_VALUE], resources));
export const dateStatus = R.curry((id, statuses) => R.path([id, KEY_DATA_DATE_STATUS_VALUE], statuses));
export const medium = R.curry((id, mediums) => R.path([id, KEY_DATA_MEDIUM_VALUE], mediums));
