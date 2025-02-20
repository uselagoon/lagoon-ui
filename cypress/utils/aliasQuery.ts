import { CyHttpMessages } from 'cypress/types/net-stubbing';

const hasOperationName = (req: CyHttpMessages.IncomingHttpRequest, operationName: string): boolean => {
  const { body } = req;
  return Object.hasOwn(body, 'operationName') && body.operationName === operationName;
};

export const aliasQuery = (req: CyHttpMessages.IncomingHttpRequest, operationName: string): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

export const aliasMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};
