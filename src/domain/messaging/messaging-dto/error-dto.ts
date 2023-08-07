// TODO: check error
export type ErrorResponse = {
  message: string;
  details: ErrorDetail[];
};

type ErrorDetail = {
  message: string;
  property: string;
};
