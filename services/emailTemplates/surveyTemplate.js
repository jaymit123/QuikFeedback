const credentials = require('../../config/keys');
module.exports = (survey) => 
`
<html>
<body>
<div style='text-align:center;'> 
<h3>I'd like your input</h3>
<p>Please answer the following question:</p>
<p>${survey.Item.body}</p>
<div> <a href="${credentials.redirectDomain}/api/surveys/${survey.Item.id}/yes">Yes</a></div>
<div> <a href="${credentials.redirectDomain}/api/surveys/${survey.Item.id}/no">No</a></div>
</div>
</body>
</html>
`