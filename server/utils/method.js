const { createLog } = require("./../events/listener");
const { ACTIONS } = require("./../constants");

const Method = {
  ActivityLogs: async (event) => {
    try {
      if (event && event.type === "UPDATE" && event.table === "registration") {
        const { affectedRows } = event;

        // Affected rows
        const { after, before } = affectedRows[0];

        const registration_id = before && before.id;

        await createLog({
          after,
          before,
          registration_id,
          action: ACTIONS.UPDATE,
          description: "A user updated his detail.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
};

module.exports = {
  Method,
};
