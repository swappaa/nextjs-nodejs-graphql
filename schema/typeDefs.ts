import gql from "graphql-tag";

// GraphQL Typedefs
export const typeDefs = gql`
  type Event {
    activity_id: ID
    branch_id: ID
    reference_id: ID
    activity_type_id: ID
    activity_desc: String
    date_added: String
    added_by: String
  }

  type Query {
    getActivities: [Event]
  }

  type Mutation {
    createActivity(
      branch_id: ID
      reference_id: ID
      activity_type_id: ID
      activity_desc: String
      date_added: String
      added_by: String
    ): Event
  }

  type Subscription {
    onCreateActivity: [Event]
  }
`;
