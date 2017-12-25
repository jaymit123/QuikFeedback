const credentials = require('../../config/keys');
module.exports = (survey) => 
`
<html>
<body>
<div style='text-align:center;'> 
<h3>I'd like your input</h3>
<p>Please answer the following question:</p>
<p>${survey.Item.body}</p>
<div> <a href="${credentials.redirectDomain}/api/surveys/feedback">Yes</a></div>
<div> <a href="${credentials.redirectDomain}/api/surveys/feedback">No</a></div>
</div>
</body>
</html>
`