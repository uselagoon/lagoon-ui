export const keyFactImageMap = Object.freeze({
  'Alpine Linux': '/static/images/keyfacts/alpine-linux.png',
  'Amazon Linux': '/static/images/keyfacts/amazon-linux.png',
  'Debian Linux': '/static/images/keyfacts/debian-linux.png',
  'Oracle Linux': '/static/images/keyfacts/oracle-linux.png',
  'Image Version': '/static/images/keyfacts/lagoon.svg',
  MariaDB: '/static/images/keyfacts/mariadb.png',
  MongoDB: '/static/images/keyfacts/mongodb.png',
  NGINX: '/static/images/keyfacts/nginx.png',
  OpenSearch: '/static/images/keyfacts/opensearch.png',
  PostgreSQL: '/static/images/keyfacts/postgres.png',
  RabbitMQ: '/static/images/keyfacts/rabbitmq.png',
  Redis: '/static/images/keyfacts/redis.png',
  Solr: '/static/images/keyfacts/solr.png',
  Varnish: '/static/images/keyfacts/varnish.png',
  NodeJS: '/static/images/keyfacts/nodejs.png',
  PHP: '/static/images/keyfacts/php.png',
  Python: '/static/images/keyfacts/python.png',
  Ruby: '/static/images/keyfacts/ruby.png',
  Dotnet: '/static/images/keyfacts/dotnet.svg',
  Drupal: '/static/images/keyfacts/drupal.png',
  Wordpress: '/static/images/keyfacts/wp.png',
  Laravel: '/static/images/keyfacts/laravel.png',
  Magento: '/static/images/keyfacts/magento.png',
  'Ruby on Rails': '/static/images/keyfacts/rails.png',
  Typo: '/static/images/keyfacts/typo.svg',
  Wagtail: '/static/images/keyfacts/wagtail.svg',
  Drush: '/static/images/keyfacts/drush.png',
  pip: '/static/images/keyfacts/pip.png',
  Yarn: '/static/images/keyfacts/yarn.png',
  'wp-cli': '/static/images/keyfacts/wpcli.png',
} as const);

export type keyFactImageType = keyof typeof keyFactImageMap;

export const keyFactCategories = ['OS', 'Lagoon', 'Service', 'Language', 'Application', 'Helper'] as const;

const getKeyFactImage = (factName: keyFactImageType) => {
  return keyFactImageMap[factName] ?? '/static/images/keyfacts/default.svg';
};

export default getKeyFactImage;
