import React from 'react';
import { Icon, Image, Label as SemanticLabel } from 'semantic-ui-react';
import { getSiteStatusFromCode, mapStatusToIcon } from 'components/SiteStatus/logic';

const matchFactToIcon = (name) => {
  switch (name) {
    case "site-code-status":
      return {
        icon: "globe",
        color: "grey"
      }

    case "drupal-version":
    case "drupal-core":
    case "Drupal":
      return {
        icon: "drupal",
        color: "blue"
      };

    case "Laravel":
    case "laravel/framework":
      return  {
        icon: "laravel",
        color: "red"
      };

    case "Lagoon":
    case "lagoon-category":
      return  {
        icon: "",
        color: "teal"
      };

    case "PHP_VERSION":
    case "php-version":
      return  {
        icon: "php",
        color: "black"
      };

    case "Express":
    case "Nodejs":
    case "Node":
    case "node-version":
      return  {
        icon: "node js",
        color: "green"
      };

    case "Python":
      return  {
        icon: "python",
        color: "grey"
      };

    case "React":
    case "Reactjs":
      return  {
        icon: "react",
        color: "blue"
      };
    
    case "Wordpress":
      return {
        icon: "wordpress",
        color: "grey"
      }

    case "Gatsby":
      return {
        icon: "js",
        color: "grey"
      }

    case "Symfony":
    case "go-lang":
    case "java":
      return  {
        icon: "info circle",
        color: "grey"
      };

    default:
      return { icon: false, color: "grey" };
  }
}

const Label = ({ className, text, factIcon, color, value, basic, href, loading, icon }) => {
  if (href) {
    return (
      <SemanticLabel className={className} as={'a'} href={href}>
        <Icon name={icon} color={'black'}/>{text}
      </SemanticLabel>
    )
  }

  if (factIcon || icon) {
    let foundIcon = {};
    if (factIcon === "Lagoon" || factIcon === "lagoon-category") {
      return (
        <SemanticLabel className={className}>
          <Image className="lagoon-logo" size="mini" src="/images/lagoon-2.svg" avatar /><>{text}</>
        </SemanticLabel>
      )
    }

    if (factIcon === "site-code-status") {
      const siteStatus = getSiteStatusFromCode(value);
      foundIcon = {
        icon: mapStatusToIcon(siteStatus),
        color: "grey"
      }
    }
    else {
      foundIcon = matchFactToIcon(factIcon);
    }

    return (
      <SemanticLabel className={className} basic={basic} color={color}>
        {factIcon && foundIcon && foundIcon.icon && <Icon loading={loading} name={foundIcon.icon} color={color ? color : foundIcon.color}/>}
        {icon && !factIcon && <Icon loading={loading} name={icon} color={color}/>}
        {text}
      </SemanticLabel>
    );
  };

  return (
    <SemanticLabel className={className} basic={basic} color={color}>
      {text}
    </SemanticLabel>
  );
};

export default Label;
