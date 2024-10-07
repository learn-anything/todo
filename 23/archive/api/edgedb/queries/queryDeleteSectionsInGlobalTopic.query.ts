// GENERATED by @edgedb/generate v0.4.1

import type {Executor} from "edgedb";

export type QueryDeleteSectionsInGlobalTopicArgs = {
  "topicName": string;
};

export type QueryDeleteSectionsInGlobalTopicReturns = {
  "id": string;
}[];

export async function queryDeleteSectionsInGlobalTopic(client: Executor, args: QueryDeleteSectionsInGlobalTopicArgs): Promise<QueryDeleteSectionsInGlobalTopicReturns> {
  return client.query(`\
with topicName := <str>$topicName

delete GlobalGuideSection
filter .<sections[is GlobalGuide].<latestGlobalGuide[is GlobalTopic].name = topicName`, args);

}