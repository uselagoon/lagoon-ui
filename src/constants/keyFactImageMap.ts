export const keyFactImageMap = Object.freeze({
  'Alpine Linux': '/keyfacts/alpine-linux.png',
  'Amazon Linux': '/keyfacts/amazon-linux.png',
  'Debian Linux': '/keyfacts/debian-linux.png',
  'Oracle Linux': '/keyfacts/oracle-linux.png',
  'Image Version': '/keyfacts/lagoon.svg',
  MariaDB: '/keyfacts/mariadb.png',
  MongoDB: '/keyfacts/mongodb.png',
  NGINX: '/keyfacts/nginx.png',
  OpenSearch: '/keyfacts/opensearch.png',
  PostgreSQL: '/keyfacts/postgres.png',
  RabbitMQ: '/keyfacts/rabbitmq.png',
  Redis: '/keyfacts/redis.png',
  Solr: '/keyfacts/solr.png',
  Varnish: '/keyfacts/varnish.png',
  NodeJS: '/keyfacts/nodejs.png',
  PHP: '/keyfacts/php.png',
  Python: '/keyfacts/python.png',
  Ruby: '/keyfacts/ruby.png',
  Dotnet: '/keyfacts/dotnet.svg',
  Drupal: '/keyfacts/drupal.png',
  Wordpress: '/keyfacts/wp.png',
  Laravel: '/keyfacts/laravel.png',
  Magento: '/keyfacts/magento.png',
  'Ruby on Rails': '/keyfacts/rails.png',
  Typo: '/keyfacts/typo.svg',
  Wagtail: '/keyfacts/wagtail.svg',
  Drush: '/keyfacts/drush.png',
  pip: '/keyfacts/pip.png',
  Yarn: '/keyfacts/yarn.png',
  'wp-cli': '/keyfacts/wpcli.png',
} as const);

export type keyFactImageType = keyof typeof keyFactImageMap;

const getKeyFactImage = (factName: keyFactImageType) => {
  return keyFactImageMap[factName] ?? '/keyfacts/default.svg';
};

export default getKeyFactImage;
