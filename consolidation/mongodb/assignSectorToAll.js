db.activities.updateMany(
  {
    sectors: { $not: { $elemMatch: { $eq: "6735c232a0b8898c1db18b27" } } },
  },
  {
    $push: {
      sectors: "6735c232a0b8898c1db18b27",
      sectorIds: ObjectId("6735c232a0b8898c1db18b27"),
    },
  }
);
