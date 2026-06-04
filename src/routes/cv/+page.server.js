import * as client from "$lib/server";
import * as server from "$lib/server/index";
import * as R from "ramda";

/** @type {import('./$types').PageServerLoad]} */
export function load() {
  const data = server.parseConfig();
  const resources = R.indexBy(R.prop(server.KEY_DATA_RESOURCE_ID), data[server.KEY_DATA_RESOURCES]);
  const dateStatuses = R.indexBy(R.prop(server.KEY_DATA_DATE_STATUS_ID), data[server.KEY_DATA_DATE_STATUSES]);
  const result = {
    [client.KEY_DATA_CV_NAME]: data[server.KEY_DATA_CV_NAME],
    [client.KEY_DATA_CV_TITLE]: data[server.KEY_DATA_CV_TITLE],
    [client.KEY_DATA_CV_LOCATION]: data[server.KEY_DATA_CV_LOCATION],
    [client.KEY_DATA_CV_CONTACTS]: data[server.KEY_DATA_CV_CONTACTS].map((contact, i) => ({
      [client.KEY_DATA_CV_CONTACT_ID]: i,
      [client.KEY_DATA_CV_CONTACT_RESOURCE]: server.resource(contact[server.KEY_DATA_CV_CONTACT_RESOURCE], resources),
      [client.KEY_DATA_CV_CONTACT_RESOURCE_EMAIL_ADDRESS]: contact[server.KEY_DATA_CV_CONTACT_RESOURCE_EMAIL_ADDRESS],
      [client.KEY_DATA_CV_CONTACT_RESOURCE_GITHUB_USER_USERNAME]: contact[server.KEY_DATA_CV_CONTACT_RESOURCE_GITHUB_USER_USERNAME],
      [client.KEY_DATA_CV_CONTACT_RESOURCE_LINKEDIN_USERNAME]: contact[server.KEY_DATA_CV_CONTACT_RESOURCE_LINKEDIN_USERNAME],
    })),
    [client.KEY_DATA_CV_EXPERIENCES]: data[server.KEY_DATA_CV_EXPERIENCES].map((exp, i) => ({
      [client.KEY_DATA_CV_EXPERIENCE_ID]: i,
      [client.KEY_DATA_CV_EXPERIENCE_TITLE]: exp[server.KEY_DATA_CV_EXPERIENCE_TITLE],
      [client.KEY_DATA_CV_EXPERIENCE_ORGANIZATION]: exp[server.KEY_DATA_CV_EXPERIENCE_ORGANIZATION],
      [client.KEY_DATA_CV_EXPERIENCE_LOCATION]: exp[server.KEY_DATA_CV_EXPERIENCE_LOCATION],
      [client.KEY_DATA_CV_EXPERIENCE_START_DATE]: exp[server.KEY_DATA_CV_EXPERIENCE_START_DATE],
      [client.KEY_DATA_CV_EXPERIENCE_START_DATE_STATUS]: server.dateStatus(exp[server.KEY_DATA_CV_EXPERIENCE_START_DATE_STATUS], dateStatuses),
      [client.KEY_DATA_CV_EXPERIENCE_END_DATE]: exp[server.KEY_DATA_CV_EXPERIENCE_END_DATE],
      [client.KEY_DATA_CV_EXPERIENCE_END_DATE_STATUS]: server.dateStatus(exp[server.KEY_DATA_CV_EXPERIENCE_END_DATE_STATUS], dateStatuses),
    })),
    [client.KEY_DATA_CV_ACTIVITIES]: data[server.KEY_DATA_CV_ACTIVITIES].map((activity, i) => ({
      [client.KEY_DATA_CV_ACTIVITY_ID]: i,
      [client.KEY_DATA_CV_ACTIVITY_TITLE]: activity[server.KEY_DATA_CV_ACTIVITY_TITLE],
      [client.KEY_DATA_CV_ACTIVITY_ORGANIZATION]: activity[server.KEY_DATA_CV_ACTIVITY_ORGANIZATION],
      [client.KEY_DATA_CV_ACTIVITY_LOCATION]: activity[server.KEY_DATA_CV_ACTIVITY_LOCATION],
      [client.KEY_DATA_CV_ACTIVITY_START_DATE]: activity[server.KEY_DATA_CV_ACTIVITY_START_DATE],
      [client.KEY_DATA_CV_ACTIVITY_START_DATE_STATUS]: server.dateStatus(activity[server.KEY_DATA_CV_ACTIVITY_START_DATE_STATUS], dateStatuses),
      [client.KEY_DATA_CV_ACTIVITY_END_DATE]: activity[server.KEY_DATA_CV_ACTIVITY_END_DATE],
      [client.KEY_DATA_CV_ACTIVITY_END_DATE_STATUS]: server.dateStatus(activity[server.KEY_DATA_CV_ACTIVITY_END_DATE_STATUS], dateStatuses),
    })),
    [client.KEY_DATA_CV_PROJECTS]: data[server.KEY_DATA_CV_PROJECTS].map((project) => {
      const id = project[server.KEY_DATA_CV_PROJECT_ID];
      const result = {
        [client.KEY_DATA_CV_PROJECT_ID]: id,
        [client.KEY_DATA_CV_PROJECT_NAME]: project[server.KEY_DATA_CV_PROJECT_NAME],
        [client.KEY_DATA_CV_PROJECT_START_DATE]: project[server.KEY_DATA_CV_PROJECT_START_DATE],
        [client.KEY_DATA_CV_PROJECT_START_DATE_STATUS]: server.dateStatus(project[server.KEY_DATA_CV_PROJECT_START_DATE_STATUS], dateStatuses),
        [client.KEY_DATA_CV_PROJECT_END_DATE]: project[server.KEY_DATA_CV_PROJECT_END_DATE],
        [client.KEY_DATA_CV_PROJECT_END_DATE_STATUS]: server.dateStatus(project[server.KEY_DATA_CV_PROJECT_END_DATE_STATUS], dateStatuses),
        [client.KEY_DATA_CV_PROJECT_LINKS]: data[server.KEY_DATA_CV_PROJECT_LINKS]
          .filter((link) => link[server.KEY_DATA_CV_PROJECT_LINK_PROJECT] == id)
          .map((link, i) => ({
            [client.KEY_DATA_CV_PROJECT_LINK_ID]: i,
            [client.KEY_DATA_CV_PROJECT_LINK_RESOURCE]: server.resource(link[server.KEY_DATA_CV_PROJECT_LINK_RESOURCE], resources),
            [client.KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_USERNAME]: link[server.KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_USERNAME],
            [client.KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_REPOSITORY]: link[server.KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_REPOSITORY],
          })),
      };

      return result;
    }),
    [client.KEY_DATA_CV_EDUCATIONS]: data[server.KEY_DATA_CV_EDUCATIONS].map((education) => {
      let id = education[server.KEY_DATA_CV_EDUCATION_ID];
      let result = {
        [client.KEY_DATA_CV_EDUCATION_ID]: id,
        [client.KEY_DATA_CV_EDUCATION_ORGANIZATION]: education[server.KEY_DATA_CV_EDUCATION_ORGANIZATION],
        [client.KEY_DATA_CV_EDUCATION_LOCATION]: education[server.KEY_DATA_CV_EDUCATION_LOCATION],
        [client.KEY_DATA_CV_EDUCATION_DEGREE]: education[server.KEY_DATA_CV_EDUCATION_DEGREE],
        [client.KEY_DATA_CV_EDUCATION_START_DATE]: education[server.KEY_DATA_CV_EDUCATION_START_DATE],
        [client.KEY_DATA_CV_EDUCATION_START_DATE_STATUS]: server.dateStatus(education[server.KEY_DATA_CV_EDUCATION_START_DATE_STATUS], dateStatuses),
        [client.KEY_DATA_CV_EDUCATION_END_DATE]: education[server.KEY_DATA_CV_EDUCATION_END_DATE],
        [client.KEY_DATA_CV_EDUCATION_END_DATE_STATUS]: server.dateStatus(education[server.KEY_DATA_CV_EDUCATION_END_DATE_STATUS], dateStatuses),
        [client.KEY_DATA_CV_EDUCATION_MAJORS]: data[server.KEY_DATA_CV_EDUCATION_MAJORS]
          .filter((major) => major[server.KEY_DATA_CV_EDUCATION_MAJOR_EDUCATION] == id)
          .map((major, i) => ({
            [client.KEY_DATA_CV_EDUCATION_MAJOR_ID]: i,
            [client.KEY_DATA_CV_EDUCATION_MAJOR_NAME]: major[server.KEY_DATA_CV_EDUCATION_MAJOR_NAME],
          })),
        [client.KEY_DATA_CV_EDUCATION_MINORS]: data[server.KEY_DATA_CV_EDUCATION_MINORS]
          .filter((minor) => minor[server.KEY_DATA_CV_EDUCATION_MINOR_EDUCATION] == id)
          .map((minor, i) => ({
            [client.KEY_DATA_CV_EDUCATION_MINOR_ID]: i,
            [client.KEY_DATA_CV_EDUCATION_MINOR_NAME]: minor[server.KEY_DATA_CV_EDUCATION_MINOR_NAME],
          })),
      };

      return result;
    }),
  };

  return result;
}