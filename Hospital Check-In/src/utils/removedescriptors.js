const removedescriptors = schema => {
  //  copy schema
  schema = { ...schema };

  const keys = Object.keys(schema);

  for (let i = 0; i < keys.length; i++) {
    // copy entity
    schema[keys[i]] = { ...schema[keys[i]] };

    delete schema[keys[i]]["_descriptor"];
  }

  return schema;
};

export default removedescriptors;
