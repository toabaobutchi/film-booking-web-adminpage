function filmBinder(data, defaultValues = ['', '', Date.now(), 0, '', '', null, '', '', null]) {
    const { name, director, launchdate, time, description, poster, finishtime, actors, rated, categoryid } = data
    return [name, director, launchdate, time, description, poster, finishtime, actors, rated, categoryid];
}

module.exports = { filmBinder }