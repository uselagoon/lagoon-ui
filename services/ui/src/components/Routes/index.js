import React from 'react';

const Routes = ({ environment }) => {
  return (
    <div>
      {environment.route &&
      <div className="route">
        <label>Primary Route</label>
        <p><a className="hover-state" target="_blank" href={environment.route}>{environment.route}</a></p>
      </div>
      }
      {environment.routes &&
      <div className="routes">
        <label>Routes</label>
        <ul>
          {environment.routes.split(',').map((route, index) => {
            return (
              <li key={`route-${index}`}>
                <a className="hover-state" target="_blank" href={route}>{route}</a>
              </li>
            )
          })}
        </ul>
      </div>
      }
      <style jsx>{`
        .routes {
          margin: 1em 0 0; 
        }

        ul {
          padding-left: 0;
        }
      `}</style>
    </div>
  );
}

export default Routes;
