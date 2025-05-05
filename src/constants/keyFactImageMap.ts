export const keyFactImageMap = Object.freeze({
  'Alpine Linux': '/static/images/keyFacts/alpine-linux.png',
  'Amazon Linux': '/static/images/keyFacts/amazon-linux.png',
  'Debian Linux': '/static/images/keyFacts/debian-linux.png',
  'Oracle Linux': '/static/images/keyFacts/oracle-linux.png',
  'Image Version': '/static/images/keyFacts/lagoon.svg',
  MariaDB: '/static/images/keyFacts/mariadb.png',
  MongoDB: '/static/images/keyFacts/mongodb.png',
  NGINX: '/static/images/keyFacts/nginx.png',
  OpenSearch: '/static/images/keyFacts/opensearch.png',
  PostgreSQL: '/static/images/keyFacts/postgres.png',
  RabbitMQ: '/static/images/keyFacts/rabbitmq.png',
  Redis: '/static/images/keyFacts/redis.png',
  Solr: '/static/images/keyFacts/solr.png',
  Varnish: '/static/images/keyFacts/varnish.png',
  NodeJS: '/static/images/keyFacts/nodejs.png',
  PHP: '/static/images/keyFacts/php.png',
  Python: '/static/images/keyFacts/python.png',
  Ruby: '/static/images/keyFacts/ruby.png',
  Dotnet: '/static/images/keyFacts/default.svg',
  Drupal: '/static/images/keyFacts/drupal.png',
  Wordpress: '/static/images/keyFacts/wp.png',
  Laravel: '/static/images/keyFacts/laravel.png',
  Magento: '/static/images/keyFacts/magento.png',
  'Ruby on Rails': '/static/images/keyFacts/rails.png',
  Typo: '/static/images/keyFacts/default.svg',
  Wagtail: '/static/images/keyFacts/default.svg',
  Drush: '/static/images/keyFacts/drush.png',
  pip: '/static/images/keyFacts/pip.png',
  Yarn: '/static/images/keyFacts/yarn.png',
  'wp-cli': '/static/images/keyFacts/wpcli.png',
} as const);

export type keyFactImageType = keyof typeof keyFactImageMap;

const getKeyFactImage = (factName: keyFactImageType) => {
  return keyFactImageMap[factName] ?? '/static/images/keyFacts/default.svg';
};

export default getKeyFactImage;
