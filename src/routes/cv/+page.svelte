<script>
  import { resolve } from "$app/paths";
  import { PUBLIC_NAME } from "$env/static/public";
  import { m } from "$lib/paraglide/messages";
  import * as server from "$lib/server";

  const { data } = $props();

  function displayContactName({ resource }) {
    switch (resource) {
      case server.DATA_RESOURCE_VALUE_EMAIL:
        return m.cv_contact_email();
      case server.DATA_RESOURCE_VALUE_GITHUB_USER:
        return m.cv_contact_github();
      case server.DATA_RESOURCE_VALUE_LINKEDIN_USER:
        return m.cv_contact_linkedin();
    }
  }

  function displayEmailURL({ emailAddress: address }) {
    return new URL(`mailto:${address}`);
  }

  function displayGitHubUserURL({ githubUsername: username }) {
    return new URL(username, "https://github.com/");
  }

  function displayLinkedInURL({ linkedinUsername: username }) {
    return new URL(username, "https://linkedin.com/in/");
  }

  function displayContactURL(contact) {
    switch (contact.resource) {
      case server.DATA_RESOURCE_VALUE_EMAIL:
        return displayEmailURL(contact);
      case server.DATA_RESOURCE_VALUE_GITHUB_USER:
        return displayGitHubUserURL(contact);
      case server.DATA_RESOURCE_VALUE_LINKEDIN_USER:
        return displayLinkedInURL(contact);
    }
  }

  function displaySingleDate({ date, status }) {
    let dateStatus;

    switch (status) {
      case server.DATA_DATE_STATUS_VALUE_COMPLETED:
        dateStatus = "completed";

        break;
      case server.DATA_DATE_STATUS_VALUE_PRESENT:
        dateStatus = "present";

        break;
      case server.DATA_DATE_STATUS_VALUE_EXPECTED:
        dateStatus = "expected";

        break;
    }

    const message = m.cv_date_single({ date: date, dateStatus: dateStatus });

    return message;
  }

  function displayDate({ start, end }) {
    if (start.status != null && end.status != null) {
      if (start.status == server.DATA_DATE_STATUS_VALUE_COMPLETED && end.status == server.DATA_DATE_STATUS_VALUE_COMPLETED) {
        return m.cv_date_range({
          startDate: start.date,
          startDateStatus: "completed",
          endDate: end.date,
          endDateStatus: "completed",
        });
      }

      if (start.status == server.DATA_DATE_STATUS_VALUE_COMPLETED && end.status == server.DATA_DATE_STATUS_VALUE_PRESENT) {
        return m.cv_date_range({
          startDate: start.date,
          startDateStatus: "completed",
          endDate: end.date,
          endDateStatus: "present",
        });
      }
      
      if (start.status == server.DATA_DATE_STATUS_VALUE_PRESENT && end.status == server.DATA_DATE_STATUS_VALUE_COMPLETED) {
        return m.cv_date_range({
          startDate: start.date,
          startDateStatus: "present",
          endDate: end.date,
          endDateStatus: "completed",
        });
      }

      if (start.status == server.DATA_DATE_STATUS_VALUE_PRESENT && end.status == server.DATA_DATE_STATUS_VALUE_EXPECTED) {
        return m.cv_date_range({
          startDate: start.date,
          startDateStatus: "present",
          endDate: end.date,
          endDateStatus: "present",
        });
      }

      return null;
    }

    if (start.status != null) {
      return displaySingleDate(start);
    }

    if (end.status != null) {
      return displaySingleDate(end);
    }

    return null;
  }

  function displayGitHubProjectURL({ githubUsername: username, githubRepository: repository }) {
    return new URL(`${username}/${repository}`, "https://github.com/");
  }

  function displayProjectURL(project) {
    switch (project.resource) {
      case server.DATA_RESOURCE_VALUE_GITHUB_REPOSITORY:
        return displayGitHubProjectURL(project);
    }
  }

  function displayProjectName({ resource }) {
    switch (resource) {
      case server.DATA_RESOURCE_VALUE_GITHUB_REPOSITORY:
        return m.wacky_sad_loris_inspire();
    }
  }
</script>

<svelte:head>
  <title>
    {m.cv_page_title({ name: PUBLIC_NAME })}
  </title>
</svelte:head>

<div class="page">
  <h1>{data[server.KEY_PAGE_CV][server.KEY_DATA_CV_NAME]}</h1>
  <p>{data[server.KEY_PAGE_CV][server.KEY_DATA_CV_TITLE]}</p>
  <ol>
    {#each data[server.KEY_PAGE_CV][server.KEY_DATA_CV_CONTACTS] as contact (contact[server.KEY_DATA_CV_CONTACT_ID])}
      {@const contactDisplay = {
        resource: contact[server.KEY_DATA_CV_CONTACT_RESOURCE],
        emailAddress: contact[server.KEY_DATA_CV_CONTACT_RESOURCE_EMAIL_ADDRESS],
        githubUsername: contact[server.KEY_DATA_CV_CONTACT_RESOURCE_GITHUB_USER_USERNAME],
        linkedinUsername: contact[server.KEY_DATA_CV_CONTACT_RESOURCE_LINKEDIN_USERNAME],
      }}
      <a href="{displayContactURL(contactDisplay)}">
        {displayContactName(contactDisplay)}
      </a>
    {/each}
  </ol>
  <h2>{m.proud_early_porpoise_fold()}</h2>
  <ol>
    {#each data[server.KEY_PAGE_CV][server.KEY_DATA_CV_EXPERIENCES] as exp (exp[server.KEY_DATA_CV_EXPERIENCE_ID])}
      {@const date = {
        start: {
          date: exp[server.KEY_DATA_CV_EXPERIENCE_START_DATE],
          status: exp[server.KEY_DATA_CV_EXPERIENCE_START_DATE_STATUS],
        },
        end: {
          date: exp[server.KEY_DATA_CV_EXPERIENCE_END_DATE],
          status: exp[server.KEY_DATA_CV_EXPERIENCE_END_DATE_STATUS],
        },
      }}
      <li>
        <h3>{exp[server.KEY_DATA_CV_EXPERIENCE_TITLE]}</h3>
        <p>{exp[server.KEY_DATA_CV_EXPERIENCE_ORGANIZATION]}</p>
        <p>{exp[server.KEY_DATA_CV_EXPERIENCE_LOCATION]}</p>
        <p>{displayDate(date)}</p>
      </li>
    {/each}
  </ol>
  <h2>Activities</h2>
  <ol>
    {#each data[server.KEY_PAGE_CV][server.KEY_DATA_CV_ACTIVITIES] as activity (activity[server.KEY_DATA_CV_ACTIVITY_ID])}
      {@const date = {
        start: {
          date: activity[server.KEY_DATA_CV_ACTIVITY_START_DATE],
          status: activity[server.KEY_DATA_CV_ACTIVITY_START_DATE_STATUS],
        },
        end: {
          date: activity[server.KEY_DATA_CV_ACTIVITY_END_DATE],
          status: activity[server.KEY_DATA_CV_ACTIVITY_END_DATE_STATUS],
        },
      }}
      <li>
        <h3>{activity[server.KEY_DATA_CV_ACTIVITY_TITLE]}</h3>
        <p>{activity[server.KEY_DATA_CV_ACTIVITY_ORGANIZATION]}</p>
        <p>{activity[server.KEY_DATA_CV_ACTIVITY_LOCATION]}</p>
        <p>{displayDate(date)}</p>
      </li>
    {/each}
  </ol>
  <h2>Projects</h2>
  <ol>
    {#each data[server.KEY_PAGE_CV][server.KEY_DATA_CV_PROJECTS] as project (project[server.KEY_DATA_CV_PROJECT_ID])}
      {@const date = {
        start: {
          date: project[server.KEY_DATA_CV_PROJECT_START_DATE],
          status: project[server.KEY_DATA_CV_PROJECT_START_DATE_STATUS],
        },
        end: {
          date: project[server.KEY_DATA_CV_PROJECT_END_DATE],
          status: project[server.KEY_DATA_CV_PROJECT_END_DATE_STATUS],
        },
      }}
      <li>
        <h3>{project[server.KEY_DATA_CV_PROJECT_NAME]}</h3>
        <p>{displayDate(date)}</p>
        <ol>
          {#each project[server.KEY_DATA_CV_PROJECT_LINKS] as link (link[server.KEY_DATA_CV_PROJECT_LINK_ID])}
            {@const projectDisplay = {
              resource: link[server.KEY_DATA_CV_PROJECT_LINK_RESOURCE],
              githubUsername: link[server.KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_USERNAME],
              githubRepository: link[server.KEY_DATA_CV_PROJECT_LINK_RESOURCE_GITHUB_REPOSITORY_REPOSITORY],
            }}
            <li>
              <a href="{displayProjectURL(projectDisplay)}">
                {displayProjectName(projectDisplay)}
              </a>
            </li>
          {/each}
        </ol>
      </li>
    {/each}
  </ol>
  <h2>Education</h2>
  <ol>
    {#each data[server.KEY_PAGE_CV][server.KEY_DATA_CV_EDUCATIONS] as education (education[server.KEY_DATA_CV_EDUCATION_ID])}
      {@const date = {
        start: {
          date: education[server.KEY_DATA_CV_EDUCATION_START_DATE],
          status: education[server.KEY_DATA_CV_EDUCATION_START_DATE_STATUS],
        },
        end: {
          date: education[server.KEY_DATA_CV_EDUCATION_END_DATE],
          status: education[server.KEY_DATA_CV_EDUCATION_END_DATE_STATUS],
        },
      }}
      <li>
        <h3>{education[server.KEY_DATA_CV_EDUCATION_ORGANIZATION]}</h3>
        <p>{education[server.KEY_DATA_CV_EDUCATION_LOCATION]}</p>
        <p>{education[server.KEY_DATA_CV_EDUCATION_DEGREE]}</p>
        <p>{displayDate(date)}</p>
        <h4>Majors</h4>
        <ol>
          {#each education[server.KEY_DATA_CV_EDUCATION_MAJORS] as major (major[server.KEY_DATA_CV_EDUCATION_MAJOR_ID])}
            <li>
              {major[server.KEY_DATA_CV_EDUCATION_MAJOR_NAME]}
            </li>
          {/each}
        </ol>
        <h4>Minors</h4>
        <ol>
          {#each education[server.KEY_DATA_CV_EDUCATION_MINORS] as minor (minor[server.KEY_DATA_CV_EDUCATION_MINOR_ID])}
            <li>
              {minor[server.KEY_DATA_CV_EDUCATION_MINOR_NAME]}
            </li>
          {/each}
        </ol>
      </li>
    {/each}
  </ol>
</div>