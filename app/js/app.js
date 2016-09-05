// Simulated AJAX call that will return JSON. You will receive back everything in the { experts: ... } object.
$
  .post('/echo/json/', {
    json: JSON.stringify({
      experts: [
        {
          id: 1,
          name: "Rob Cameron",
          photo: "http://placekitten.com/350/350",
          price: 100.00
        }, {
          id: 2,
          name: "Jeremy Thomas",
          photo: "http://placekitten.com/325/325",
          price: 75.00
        }, {
          id: 3,
          name: "Geoff Skow",
          photo: "http://placekitten.com/300/300",
          price: 50.00
        }
      ]
    })
  }, function(data) {
    clearExperts();
    renderExperts(data.experts);
  });

var expertTemplate = $('#expert_template').html();
var $expertContainer = $('#experts');

function clearExperts() {
  $expertContainer.html('');
}

function renderExperts(experts) {
  experts
    .forEach(function(expert) {
      renderExpert(expert);
    });
}

function renderExpert(expert) {
  var renderedTemplate = expertTemplate;
  Object
    .keys(expert)
    .forEach(function(key) {
      renderedTemplate = renderedTemplate.replace('#{' + key + '}', expert[key]);
    });

}
