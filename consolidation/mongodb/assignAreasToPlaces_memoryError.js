db.places.find({ geometry: { $exists: true } }).forEach((area) => {
  console.log(area.name);
  db.places.updateMany(
    {
      center: {
        $geometry: area.geometry,
      },
      within: { $not: { $elemMatch: { $eq: area._id.toString() } } },
    },
    { $push: { within: area._id.toString(), withinIds: area._id } }
  );
});
