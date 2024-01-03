function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function getUserPermissions(member) {
  const allowedPermissions = [
    'Administrator',
    'ManageServer',
    'ManageRoles',
    'ManageChannels',
    'ManageMessages',
    'ManageWebhooks',
    'ManageNicknames',
    'ManageEmojis',
    'KickMembers',
    'BanMembers',
    'MentionEveryone',
    'MoveMembers'
  ];

  const hasAdministratorPermission = member.permissions.has('Administrator');

  let permissions = hasAdministratorPermission ? allowedPermissions : member.permissions.toArray().filter(perm => allowedPermissions.includes(perm));

  return permissions.length ? permissions.map(perm => perm.replace(/([a-z])([A-Z])/g, '$1 $2')).join(', ') : 'None';
};

function dateForm(date) {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

function dateForm2(date) {
  const dateObject = new Date(date);
  const year = dateObject.getUTCFullYear();
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

module.exports = {
  capitalizeFirstLetter,
  getUserPermissions,
  dateForm,
  dateForm2
};