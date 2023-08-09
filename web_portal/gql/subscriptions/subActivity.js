import { gql } from "@apollo/client";

export const ON_CREATE_ACTIVITY = gql`
  subscription onCreateActivity {
    onCreateActivity {
      activity_id
      branch_id
      reference_id
      activity_type_id
      activity_desc
      date_added
      added_by
    }
  }
`;
