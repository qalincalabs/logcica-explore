db.places.find({ geometry: { $exists: true } }).forEach((area) => {
  console.log(area.name);
  db.places
    .find({
      within: { $not: { $elemMatch: { $eq: area._id.toString() } } },
      center: {
        $geoWithin: {
          $geometry: area.geometry,
        },
      },
      within: { $not: { $elemMatch: { $eq: area._id.toString() } } },
    })
    .forEach((p) => {
      console.log(p);
      const updateResult = db.places.updateOne(
        {
          _id: p._id,
          within: { $not: { $elemMatch: { $eq: area._id.toString() } } },
        },
        { $push: { within: area._id.toString(), withinIds: area._id } }
      );
      console.log(updateResult);
    });
});
