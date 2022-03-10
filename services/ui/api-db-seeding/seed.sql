/*
  ## api-db seeding
  Run with the following after all tables are created:
  'yarn run seed'
*/


/* Projects */
 INSERT INTO project (id, name, availability, openshift, git_url, production_environment, facts_ui, problems_ui, private_key)
 VALUES 
        ("100", "drupal-example", "HIGH", "4", "ssh://git@172.17.0.1:2222/git/drupal-example.git", "prod", "1", "1", "-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3AAAAIgBaAqWAWgK
lgAAAAtzc2gtZWQyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3A
AAAECDyIOiftKVxUiiK1IoUy9/SAASJJT6UKhE4zrFhXG9HRT8XfboFWRR4NcmnaBOeZe+
FMeqowgKSVHd/p1VDdPcAAAAAAECAwQF
-----END OPENSSH PRIVATE KEY-----"),
        ("101", "node-example", "HIGH", "4", "ssh://git@172.17.0.1:2222/git/node-example.git", "prod", "1", "1", "-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3AAAAIgBaAqWAWgK
lgAAAAtzc2gtZWQyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3A
AAAECDyIOiftKVxUiiK1IoUy9/SAASJJT6UKhE4zrFhXG9HRT8XfboFWRR4NcmnaBOeZe+
FMeqowgKSVHd/p1VDdPcAAAAAAECAwQF
-----END OPENSSH PRIVATE KEY-----"),
        ("102", "wordpress-example", "HIGH", "4", "ssh://git@172.17.0.1:2222/git/wordpress-example.git", "prod", "1", "1", "-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3AAAAIgBaAqWAWgK
lgAAAAtzc2gtZWQyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3A
AAAECDyIOiftKVxUiiK1IoUy9/SAASJJT6UKhE4zrFhXG9HRT8XfboFWRR4NcmnaBOeZe+
FMeqowgKSVHd/p1VDdPcAAAAAAECAwQF
-----END OPENSSH PRIVATE KEY-----"),
        ("103", "laravel-example", "HIGH", "4", "ssh://git@172.17.0.1:2222/git/laravel-example.git", "prod", "1", "1", "-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3AAAAIgBaAqWAWgK
lgAAAAtzc2gtZWQyNTUxOQAAACAU/F326BVkUeDXJp2gTnmXvhTHqqMICklR3f6dVQ3T3A
AAAECDyIOiftKVxUiiK1IoUy9/SAASJJT6UKhE4zrFhXG9HRT8XfboFWRR4NcmnaBOeZe+
FMeqowgKSVHd/p1VDdPcAAAAAAECAwQF
-----END OPENSSH PRIVATE KEY-----");

/* Environments */
 INSERT INTO environment (id, name, project, deploy_type, deploy_base_ref, environment_type, openshift_project_name, route, routes)
 VALUES 
        ("1001", "prod", "100", "BRANCH", "prod", "PRODUCTION", "drupal-example-prod", "http://drupal-example.org", "http://drupal-example.org,https://varnish-drupal-example-org-prod.us.amazee.io,https://nginx-drupal-example-org-prod.us.amazee.io"),
        ("1002", "staging", "100", "BRANCH", "staging", "DEVELOPMENT", "drupal-example-staging", "http://drupal-example-staging.org", "http://drupal-example-staging.org,https://varnish-drupal-example-org-staging.us.amazee.io,https://nginx-drupal-example-org-staging.us.amazee.io"),
        ("1003", "dev", "100", "BRANCH", "dev", "DEVELOPMENT", "drupal-example-dev", "http://drupal-example-dev.org", "http://drupal-example-dev.org,https://varnish-drupal-example-org-dev.us.amazee.io,https://nginx-drupal-example-org-dev.us.amazee.io"),
        ("1011", "prod", "101", "BRANCH", "prod", "PRODUCTION", "node-example-prod", "http://node-example.org", "http://node-example.org,https://varnish-node-example-org-prod.us.amazee.io,https://nginx-node-example-org-prod.us.amazee.io"),
        ("1021", "prod", "102", "BRANCH", "prod", "PRODUCTION", "wordpress-example-prod", "http://wordpress-example.org", "http://wordpress-example.org,https://varnish-wordpress-example-org-prod.us.amazee.io,https://nginx-wordpress-example-org-prod.us.amazee.io"),
        ("1031", "prod", "103", "BRANCH", "prod", "PRODUCTION", "laravel-example-prod", "http://laravel-example.org", "http://laravel-example.org,https://varnish-laravel-example-org-prod.us.amazee.io,https://nginx-laravel-example-org-prod.us.amazee.io");


/* Deployments */
INSERT INTO deployment (name, status, environment, created, started, completed)
VALUES
      ("build-1", "COMPLETE", "1001", "2022-01-01 11:11:11", "2022-01-01 11:11:11", "2022-01-01 11:21:11"),
      ("build-2", "FAILED", "1001", "2022-01-01 11:10:11", "2022-01-01 11:10:11", "2022-01-01 11:15:11"),
      ("build-3", "RUNNING", "1001", "2022-01-01 11:21:11", "2022-01-01 11:21:11", "2022-01-01 11:31:11"),
      ("build-1", "COMPLETE", "1011", "2022-01-01 11:11:11", "2022-01-01 11:11:11", "2022-01-01 11:21:11"),
      ("build-2", "FAILED", "1021", "2022-01-01 11:32:11", "2022-01-01 11:32:11", "2022-01-01 11:33:11"),
      ("build-3", "RUNNING", "1031", "2022-01-01 11:35:11", "2022-01-01 11:35:11", "2022-01-01 11:38:11");

/* Environment Services */
INSERT INTO environment_service (environment, name)
VALUES
      ("1001", "cli"),
      ("1001", "nginx"),
      ("1001", "mariadb"),
      ("1011", "cli"),
      ("1011", "nginx"),
      ("1011", "mongo"),
      ("1021", "cli"),
      ("1021", "nginx"),
      ("1021", "mariadb"),
      ("1031", "cli"),
      ("1031", "nginx"),
      ("1031", "climariadb");

/* Facts */
INSERT INTO environment_fact (name, value, environment, source, description, category, key_fact)
VALUES
      ("drupal/core", "10.1.1", "1001", "sbom:cli", "The current Drupal version", "Framework", "1"),
      ("PHP_VERSION", "7.4.1", "1001", "sbom:cli", "The current PHP version", "Programming language", "1"),
      ("drupal/core", "9.1.1", "1002", "sbom:cli", "The current Drupal version", "Framework", "1"),
      ("PHP_VERSION", "7.2.1", "1002", "sbom:cli", "The current PHP version", "Programming language", "1"),
      ("drupal/core", "8.1.1", "1003", "sbom:cli", "The current Drupal version", "Framework", "1"),
      ("PHP_VERSION", "7.2.1", "1003", "sbom:cli", "The current PHP version", "Programming language", "1"),
      ("node", "16.0.1", "1011", "sbom:cli", "The current NodeJs version", "Framework", "1"),
      ("node", "14.0.1", "1012", "sbom:cli", "The current NodeJs version", "Framework", "1"),
      ("node", "12.0.1", "1013", "sbom:cli", "The current NodeJs version", "Framework", "1"),
      ("wordpress", "5.9.1", "1021", "sbom:cli", "The current Wordpress version", "Framework", "1"),
      ("PHP_VERSION", "7.4.1", "1021", "sbom:cli", "The current PHP version", "Programming language", "1"),
      ("laravel", "9.0.1", "1031", "sbom:cli", "The current Laravel version", "Framework", "1"),
      ("PHP_VERSION", "7.4.1", "1031", "sbom:cli", "The current PHP version", "Programming language", "1");
