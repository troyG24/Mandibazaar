var eighteenYearsAgo = new Date();
eighteenYearsAgo = new Date(eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18)).toISOString();
document.getElementById("date").max = eighteenYearsAgo.substring(0,10);
