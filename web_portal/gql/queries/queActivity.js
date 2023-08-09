import { gql } from "@apollo/client";

export const GET_ACTIVITY = gql`
  query activity($activity_id: ID!) {
    activity(activity_id: $activity_id) {
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

export const GET_ACTIVITIES = gql`
  query {
    getActivities {
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
