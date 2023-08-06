import { MongoClient } from "mongodb";

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_CONNECT_DB);
    return client;
  } catch (error) {
    throw new Error("클라이언트 연결에 실패했습니다...😱");
  }
}

export async function insertDocument(collection, document) {
  const client = await connectDatabase();
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  client.close();
  return result;
}

// 이메일로 유저 찾기
export async function findUserByEmail(email) {
  const client = await connectDatabase();
  const db = client.db();
  const user = await db.collection("users").findOne({ email });

  client.close();
  return user;
}

export async function getGoalList() {
  const client = await connectDatabase();
  const db = client.db();

  let goalList = await db.collection("goal-list").find().toArray();

  goalList = goalList.map(item => {
    const goal = { ...item };
    goal._id = goal._id.toString();
    return goal;
  });

  client.close();
  return goalList;
}

// export async function getSelectedDocuments(collection, postId) {
//   const client = await connectDatabase();
//   const db = client.db();
//   const result = await db.collection(collection).findOne({ _id: new ObjectId(postId) });

//   if (result) {
//     result._id = result._id.toString();
//   }

//   client.close();
//   return result;
// }

// // edit
// export async function replaceDocument(collection, selectedPostId, editPost) {
//   const client = await connectDatabase();
//   const db = client.db();
//   const result = await db
//     .collection(collection)
//     .updateOne({ _id: new ObjectId(selectedPostId) }, { $set: editPost });

//   client.close();
//   return result;
// }

// // delete
// export async function deleteSelectedDocument(collection, selectedPostId) {
//   const client = await connectDatabase();
//   const db = client.db();

//   const result = await db.collection(collection).deleteOne({ _id: new ObjectId(selectedPostId) });

//   client.close();
//   return result;
// }
