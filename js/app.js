var App = {
    banks: [],
    dataUrl: 'http://bridnap.github.io/rtsearch/data/banks.json',
    init: function () {
        this.fetchBanks();
    },
    fetchBanks: function() {
        var self = this;
        $.get(self.dataUrl).done(function(response) {
            self.banks = response;
            self.showForm();
            self.bindEvents();
        }).fail(function(response) {
            console.log('Error fetching Routing Number: ' + response.resposeText);
        });
    },
    bindEvents: function () {
        $('body').tooltip({ selector: '[data-toggle=tooltip]' });
        $('form#search-form').on('keyup', this.handleFormKeyUp);
        $('form#search-form').on('submit', this.handleFormSubmission);
        $('#info-button').click(this.toggleInfoButton);
    },
    handleFormKeyUp: function (e) {
        e.preventDefault();
        var query = (this.value === undefined) ? $('#query').val() : this.value;
        if(query === '') {
            $('#results').html('');
        }
    },
    handleFormSubmission: function (e) {
        e.preventDefault();
        var self = App;
        var query = (this.value === undefined) ? $('#query').val() : this.value;

        if(query === '') {
            return false;
        }

        var context = self.search(query);
        var html = $('#results-template').html();
        var template = Handlebars.compile(html);
        $('#results').html(template(context));
    },
    toggleInfoButton: function () {
        $('#info').slideToggle(function () {
            var icon = $('#info-button-icon');
            if(icon.hasClass('fa-info-circle')) {
                $('#info-button').addClass('open');
                icon.removeClass('fa-info-circle').addClass('fa-close');
            } else {
                $('#info-button').removeClass('open');
                icon.removeClass('fa-close').addClass('fa-info-circle');
            }
        });
    },
    showForm: function () {
        $('#form').html($('#search-form-template').html());
    },
    search: function(query) {
        var context = {
            name: query,
            allowed: false,
            bank_name: false,
            address: false,
            city: false,
            state: false,
            zip: false,
            new_rt: false
        };

        var results = App.banks.filter(function(bank) {
            return (query.toLowerCase() == bank.name.toLowerCase());
        });

        if(results.length > 0) {
            context.name = results[0].name;
            context.allowed = true;
            context.bank_name = results[0].bank_name;
            context.address = results[0].address;
            context.city = results[0].city;
            context.state = results[0].state;
            context.zip = results[0].zip;
            context.new_rt = results[0].new_rt;

        }

        return context;
    }
};