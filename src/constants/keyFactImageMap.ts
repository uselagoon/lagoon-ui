export const keyFactImageMap = Object.freeze({
  'Alpine Linux': '/keyFacts/alpine-linux.png',
  'Amazon Linux': '/keyFacts/amazon-linux.png',
  'Debian Linux': '/keyFacts/debian-linux.png',
  'Oracle Linux': '/keyFacts/oracle-linux.png',
  'Image Version': '/keyFacts/lagoon.svg',
  MariaDB: '/keyFacts/mariadb.png',
  MongoDB: '/keyFacts/mongodb.png',
  NGINX: '/keyFacts/nginx.png',
  OpenSearch: '/keyFacts/opensearch.png',
  PostgreSQL: '/keyFacts/postgres.png',
  RabbitMQ: '/keyFacts/rabbitmq.png',
  Redis: '/keyFacts/redis.png',
  Solr: '/keyFacts/solr.png',
  Varnish: '/keyFacts/varnish.png',
  NodeJS: '/keyFacts/nodejs.png',
  PHP: '/keyFacts/php.png',
  Python: '/keyFacts/python.png',
  Ruby: '/keyFacts/ruby.png',
  Dotnet: '/keyFacts/default.svg',
  Drupal: '/keyFacts/drupal.png',
  Wordpress: '/keyFacts/wp.png',
  Laravel: '/keyFacts/laravel.png',
  Magento: '/keyFacts/magento.png',
  'Ruby on Rails': '/keyFacts/rails.png',
  Typo: '/keyFacts/default.svg',
  Wagtail: '/keyFacts/default.svg',
  Drush: '/keyFacts/drush.png',
  pip: '/keyFacts/pip.png',
  Yarn: '/keyFacts/yarn.png',
  'wp-cli': '/keyFacts/wpcli.png',
} as const);

export type keyFactImageType = keyof typeof keyFactImageMap;

const getKeyFactImage = (factName: keyFactImageType) => {
  return keyFactImageMap[factName] ?? '/keyFacts/default.svg';
};

export default getKeyFactImage;
