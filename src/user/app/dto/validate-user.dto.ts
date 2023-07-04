export type ValidateUserInput = {
  email: string;
};

export type ValidateUserOutput = {
  already_exists: boolean;
  deny?: {
    reason: string;
    user_facing_message: string;
  };
};
