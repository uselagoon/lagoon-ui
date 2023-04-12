export const dictionary = {
  translations: {
    en: {
      header: {
        nav: {
          settings: "Settings",
          projects: "Your projects",
          account: "Your account",
          signOut: "Sign out",
          allDeployments: "Deployments",
        },
      },
      projects: {
        title: "Projects",
        project: "Project",
        projects: "Projects",
        noProjects: "No Projects",
        noMatch: "No Projects matching",
      },
      project: {
        environments: "Environments",
        noEnvironments: "No Environments",
        production: "Production",
        type: "Type",
        cluster: "Cluster",
        active: "Active",
        standby: "Standby",
        region: "Region",
        route: "Route",
        sidebar: {
          created: "Created",
          origin: "Origin",
          copied: "Copied",
          branchesEnabled: "Branches enabled",
          prsEnabled: "Pull requests enabled",
          devEnvsInuse: "Development environments in use",
          deployTargets: "Deploy Targets",
          of: "of",
        },
      },
      environment: {
        nav: {
          overview: "Overview",
          deployments: "Deployments",
          backups: "Backups",
          tasks: "Tasks",
          problems: "Problems",
          facts: "Facts",
          insights: "Insights",
        },
        envType: "Environment Type",
        deployType: "Deployment Type",
        created: "Created",
        lastDeploy: "Last Deploy",
        source: "Source",
        routes: "Routes",
        activeRoutes: "Active Environment Routes",
        standbyRoutes: "Standby Environment Routes",
        switching: "Switching Standby Environment to Active...",
        deleteQueued: "Delete queued",
      },
      deployments: {
        deployLatest: {
          noManualDeployments:
            "Manual deployments are not available for this environment.",
          deploy: "Deploy",
          branchDeployment: "Start a new deployment of branch {{branch}}.",
          prDeployment: "Start a new deployment of pull request {{title}}.",
          promote:
            "Start a new deployment from environment {{project}}-{{ref}}.",
          deploymentQueued: "Deployment queued.",
          deploymentProblem: "There was a problem deploying.",
        },
        label: {
          name: "Name",
          created: "Created",
          status: "Status",
          duration: "Duration",
        },
      },
      deployment: {
        label: {
          created: "Created",
          status: "Status",
          duration: "Duration",
          logView: "Log view",
        },
        raw: "View raw",
        parsed: "View parsed",
      },
      bulkDeployments: {
        label: {
          project: "Project",
          environment: "Environment",
          name: "Name",
          priority: "Priority",
          created: "Created",
          status: "Status",
          duration: "Duration",
        },
        noDeployments: "No Deployments",
      },
      backups: {
        label: {
          source: "Source",
          created: "Created",
          backupID: "Backup ID",
        },
        restore: {
          retrieveFailed: "Retrieve failed",
          retrieving: "Retrieving ...",
          retrieve: "Retrieve",
          download: "Download",
        },
        noBackups: "No Backups",
        notification: `If you need a current database or files dump, use the tasks "drush
        sql-dump" or "drush archive-dump" in the new "Tasks" section!`,
      },
      tasks: {
        addTask: {
          environment: "Environment",
          destination: "Destination",
          source: "Source",
          run: "Run task",
          warning:
            "Warning!\n This task replaces files. Be careful to double check the source and destination environment!",
          warningDb:
            "Warning! \n This task overwrites databases. Be careful to double check the source and destination environment!",
        },
        name: "Name",
        created: "Created",
        service: "Service",
        status: "Status",
        noTasks: "No Tasks",
        admin: "Admin",
      },

      task: {
        label: {
          created: "Created",
          service: "Service",
          status: "Status",
        },
      },
      facts: {
        name: "Name",
        source: "Source",
        value: "Value",
      },
      insights: {
        insight: "Insight",
        insights: "Insights",
        filters: {
          name: "Name",
          service: "Service",
          type: "Type",
        },
        file: "File",
        service: "Service",
        type: "Type",
        created: "Created",
        size: "Size",
        download: "Download",
        noInsights: "No insights",
      },
      problems: {
        label: {
          problems: "Problems",
          critical: "Critical",
          high: "High",
          medium: "Medium",
          low: "low",
        },
        filters: {
          severity: "Severity",
          source: "Source",
          service: "Service",
        },
        problemID: "Problem ID",
        severity: "Severity",
        source: "Source",
        lastDetected: "Last Detected",
        service: "Service",
        package: "Package",
        noProblems: "No Problems",
      },
      problemsByHex: {
        filters: {
          severity: "Severity",
          source: "Source",
          type: "Type",
        },
        showNoProblems: "Show Projects with no problems",
      },
      problemsByProject: {
        filters: {
          project: "Project",
          severity: "Severity",
          source: "Source",
          envType: "EnvType",
        },
      },
      problemsDashboard: {
        title: "Problems Dashboard By Identifier",
        filters: {
          source: "Source",
          severity: "Severity",
          type: "Type",
        },
        label: {
          results: "Results",
          critical: "Critical",
          high: "High",
          medium: "Medium",
          low: "Low",
          showing: "Showing",
        },
        identifier: {
          problem: "Problem identifier",
          source: "Source",
          severity: "Severity",
          affected: "Projects affected",
          noProblems: "No problems",
          labels: {
            description: "Problem Description",
            package: "Package",
            associatedLink: "Associated link (CVE description etc.)",
            projectsAffected: "Projects:Environments affected:",
          },
        },
      },
      problem: {
        label:{
            description: "Description",
            created: "Created",
            version: "Version",
            fixedIn: "Fixed in Version",
            associatedLink: "Associated link (CVE)",
            service: "Service",
            data: "Data",
            title: "Title",
            remediation: "Remediation",
            moduleUpdates: "Module Updates",
            severity: "Severity",
            lastDetected: "Last Detected",
            type: "Type",
        }
      },
      allDeployments: {
        title: "Deployments",
        project: "Project",
        environment: "Environment",
        cluster: "Cluster",
        name: "Name",
        priority: "Priority",
        created: "Created",
        status: "Status",
        duration: "Duration",
        noDeployments: "No Deployments",
        cancelled: "Cancelled",
        cancel: "Cancel",
      },
      settings: {
        title: "SSH keys",
        name: "Name",
        type: "Type",
        fingerprint: "Fingerprint",
        created: "Created",
        noKeys: "No SSH keys",
        deletingKey: "Deleting SSH Key...",
        addingKey: "Adding SSH Key...",
        delete: "Delete",
        keyName: "SSH Key Name",
        sshKey: "SSH Key",
        enterKey: "Please enter a SSH key name",
        invalidKey: "The SSH Key entered is invalid",
        add: "Add",
      },
      placeholders: {
        search: "Type to search",
        deploymentFilter: "Filter deployments...",
        problemsFilter: "Filter problems e.g. CVE-2020-2342",
        resultsDisplay: "Results to display...",
        selectTask: "Select a task...",
        selectEnvironment: "Select environment...",
        sshKey:
          "Begins with 'ssh-rsa', 'ssh-ed25519', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521'",
        facts: "Filter facts e.g. PHP version",
        insights: "Filter insights e.g. sbom.json",
        problemsByIdentifier: "Filter problems e.g. CVE-2020-2342",
      },
      breadcrumbs: {
        task: "Task",
        project: "Project",
        environment: "Environment",
        deployment: "Deployment",
        bulkDeployment: "Bulk Deployment",
      },
      general: {
        delete: "Delete",
        cancel: "Cancel",
        cancelled: "Cancelled",
        download: "Download",
        loading: "Loading ...",
        more: "More...",
        results: "Results",
        projects: "Projects",
        project: "Project",
        noProjectSelected: "No project selected",
        environments: "Environments",
        deleteConfirm: "Type the name of the {{deleteType}} to confirm.",
        deleteConfirmInfo:
          "This will delete all resources associated with the {{deleteType}} ",
        deleteConfirmUndone:
          "and cannot be undone. Make sure this is something you really want to do!",
      },
      errors: {
        badRequest: "Bad Request",
        noAuth: "Not Authenticated",
        notFound: "This page could not be found",
        internalError: "Internal Server Error",
        notImplemented: "Not implemented",
        unexpected: "An unexpected error has occurred",
      },
      resultsLimited: {
        description:
          "Number of results displayed is limited to {{limit}}{{message}}",
        label: {
          all: "all",
        },
      },
    },

    it: {
      header: {
        nav: {},
      },
      projects: {
        title: "Projects",
      },
      project: {
        sidebar: {},
      },
      environment: {
        nav: {},
      },
      deployments: {
        deployLatest: {},
        label: {},
      },
      deployment: {},
      bulkDeployments: {
        label: {},
      },
      backups: {
        label: {},
        restore: {},
      },
      tasks: {
        addTask: {},
      },
      task: { label: {} },
      facts: {},
      insights: {
        filters: {},
      },
      problems: {
        label: {},
        filters: {},
      },
      problemsByHex: {
        filters: {},
      },
      problemsByProject: {
        filters: {},
      },
      problemsDashboard: {
        filters: {},
        label: {},
        identifier: {
          labels: {},
        },
      },
      problem: {
        label:{},
      },
      allDeployments: {},
      settings: {},
      placeholders: {},
      breadcrumbs: {},
      general: {},
      errors: {},
      resultsLimited: {
        label: {},
      },
    },
  },
};
