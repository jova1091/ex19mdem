var g_eje = new Array();
var b_eje = new Array();
var g_leg = new Array();
var b_leg = new Array();
var g_jud = new Array();
var b_jud = new Array();
var errores = 0;

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact('#leg.dropzone').dropzone({
    accept: '.drag-drop',
    overlap: 0.75,
    ondropactivate: function (event) {
        if (b_leg.length + g_leg.length < 3) {
            event.target.classList.add('drop-active')
            event.target.classList.add('animate__pulse')
            event.target.classList.add('animate__infinite')
        }
        event.relatedTarget.classList.remove('animate__animated');
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').addClass('animate__heartBeat animate__infinite animate__slow')
    },
    ondragenter: function (event) {
        event.target.classList.add('drop-target')
        event.relatedTarget.classList.add('can-drop')
        event.relatedTarget.classList.add('blue')
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').addClass('blue')
        $('.back[data-id=' + event.relatedTarget.id + ']').addClass('blue')
    },
    ondragleave: function (event) {
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.classList.remove('blue')
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').removeClass('blue')
        $('.back[data-id=' + event.relatedTarget.id + ']').removeClass('blue')
        $('.back[data-id=' + event.relatedTarget.id + ']').removeClass('wrong')
        event.relatedTarget.classList.remove('wrong')
        compute(event.relatedTarget.id, 'leg', 'leave')
    },
    ondrop: function (event) {
        compute(event.relatedTarget.id, 'leg', 'drop')
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active')
        event.target.classList.remove('animate__pulse')
        event.target.classList.remove('animate__infinite')
        event.target.classList.remove('drop-target')
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').removeClass('animate__heartBeat animate__infinite animate__slow')
    }
})

interact('#jud.dropzone').dropzone({
    accept: '.drag-drop',
    overlap: 0.75,
    ondropactivate: function (event) {
        if (b_jud.length + g_jud.length < 3) {
            event.target.classList.add('drop-active')
            event.target.classList.add('animate__pulse')
            event.target.classList.add('animate__infinite')
        }
    },
    ondragenter: function (event) {
        event.target.classList.add('drop-target')
        event.relatedTarget.classList.add('can-drop')
        event.relatedTarget.classList.add('red')
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').addClass('red')
        $('.back[data-id=' + event.relatedTarget.id + ']').addClass('red')
    },
    ondragleave: function (event) {
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.classList.remove('red')
        event.relatedTarget.classList.remove('wrong')
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').removeClass('red')
        $('.back[data-id=' + event.relatedTarget.id + ']').removeClass('red')
        $('.back[data-id=' + event.relatedTarget.id + ']').removeClass('wrong')
        compute(event.relatedTarget.id, 'jud', 'leave')
    },
    ondrop: function (event) {
        compute(event.relatedTarget.id, 'jud', 'drop')
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active')
        event.target.classList.remove('animate__pulse')
        event.target.classList.remove('animate__infinite')
        event.target.classList.remove('drop-target')
    }
})

interact('#eje.dropzone').dropzone({
    accept: '.drag-drop',
    overlap: 0.75,
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
        })
    ],
    ondropactivate: function (event) {
        if (b_eje.length + g_eje.length < 3) {
            event.target.classList.add('drop-active')
            event.target.classList.add('animate__pulse')
            event.target.classList.add('animate__infinite')
        }
    },
    ondragenter: function (event) {
        event.target.classList.add('drop-target')
        event.relatedTarget.classList.add('can-drop')
        event.relatedTarget.classList.add('yellow')
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').addClass('yellow')
        $('.back[data-id=' + event.relatedTarget.id + ']').addClass('yellow')
    },
    ondragleave: function (event) {
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.classList.remove('yellow')
        $('.wrapper-text[data-id=' + event.relatedTarget.id + ']').removeClass('yellow')
        $('.back[data-id=' + event.relatedTarget.id + ']').removeClass('yellow')
        $('.back[data-id=' + event.relatedTarget.id + ']').removeClass('wrong')
        event.relatedTarget.classList.remove('wrong')
        compute(event.relatedTarget.id, 'eje', 'leave')
    },
    ondrop: function (event) {
        compute(event.relatedTarget.id, 'eje', 'drop')
    },
    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active')
        event.target.classList.remove('animate__pulse')
        event.target.classList.remove('animate__infinite')
        event.target.classList.remove('drop-target')
    }
})

interact('.drag-drop')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'main',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            move: dragMoveListener
        }
    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

function listOptions() {
    var options = document.getElementById('options');
    var functions = [{
            11: 'Hacer las leyes'
        },
        {
            12: 'Ejercer el control político frente al Gobierno'
        },
        {
            13: 'Elaborar el presupuesto que habrá de ejecutar el Gobierno'
        },
        {
            21: 'Ejecutar las leyes'
        },
        {
            22: 'Dictar reglamentos y actos para la cumplida ejecución de las leyes'
        },
        {
            23: 'Presentar objeciones/vetos frente a las leyes expedidas por el Congreso'
        },
        {
            31: 'Interpretar las leyes'
        },
        {
            32: 'Declarar la inconstitucionalidad de las leyes expedidas por el Congreso'
        },
        {
            33: 'Declarar la nulidad de los actos expedidos por el Gobierno para cumplir las leyes'
        }
    ]

    var reordering = [];

    while (functions.length != 0) {
        var aleatorio = Math.floor(Math.random() * (functions.length));
        reordering.push(functions[aleatorio]);
        functions.splice(aleatorio, 1);
    }

    for (let i = 0; i < reordering.length; i++) {
        var wrapper = document.createElement('div');
        wrapper.classList = 'wrapper';
        var div0 = document.createElement('div');
        div0.classList = 'drag-drop animate__animated animate__swing animate__infinite animate__slow';
        div0.id = Object.keys(reordering[i]);
        var div1 = document.createElement('div');
        div1.classList = 'back';
        div1.dataset.id = Object.keys(reordering[i]);
        var div2 = document.createElement('div');
        div2.dataset.id = Object.keys(reordering[i]);
        div2.classList = 'wrapper-text animate__animated';
        div2.textContent = Object.values(reordering[i]);
        wrapper.appendChild(div0);
        wrapper.appendChild(div1);
        wrapper.appendChild(div2);
        options.appendChild(wrapper);
    }
}

$(document).ready(function(){
    listOptions();
    var width = parseInt($('.dropzone').css('width').split('px'));
    $('#btnModalExit').on('click', function(){
        $('#modalExit').css('display', 'flex');
        $('.modal-contenido').addClass('animate__flipInX');
    })
    $('#btnModalCongrats').on('click', function(){
        $('#modalCongrats').css('display', 'flex');
        $('.modal-contenido').addClass('animate__flipInX');
    })
    $('.restart').on('click', function(){
        location.reload();
    })
    $('.dropzone').css({
        'width': ((window.innerWidth * 11) / 100),
        'height': ((window.innerWidth * 11) / 100)
    });
    $('.dropzone img').css({
        'width': ((width * 50) / 100),
        'height': ((width * 50) / 100),
        'top': -(width * 20) / 100,
        'right': -(width * 10) / 100
    });
    $(window).resize(function(){
        var anchoEle = window.innerWidth * 11 / 100;
        var altoEle = window.innerWidth * 11 / 100;
        $('.dropzone').css({
            'width': anchoEle,
            'height': altoEle
        });
        $('.dropzone img').css({
            'width': ((anchoEle * 50) / 100),
            'height': ((anchoEle * 50) / 100),
            'top': -(anchoEle * 20) / 100,
            'right': -(anchoEle * 10) / 100
        });
    })
});

function compute(id, dropZone, action) {
    (dropZone == 'eje') ? validate_dropzone(id, dropZone, action, [21, 22, 23]): null;
    (dropZone == 'leg') ? validate_dropzone(id, dropZone, action, [11, 12, 13]): null;
    (dropZone == 'jud') ? validate_dropzone(id, dropZone, action, [31, 32, 33]): null;
}

function validate_dropzone(id, dropZone, action, ids) {
    var arr_g;
    var arr_b;
    var animation = 'animate__tada';
    var triangule = '#triangule';
    if (dropZone == 'eje') {
        arr_g = g_eje;
        arr_b = b_eje;
    } else if (dropZone == 'leg') {
        arr_g = g_leg;
        arr_b = b_leg;
    } else if (dropZone == 'jud') {
        arr_g = g_jud;
        arr_b = b_jud;
    }
    if (id == ids[0] || id == ids[1] || id == ids[2]) {
        if (action == 'drop') {
            if (arr_g.indexOf(id) == -1) {
                arr_g.push(id);
            }
        } else if (action == 'leave') {
            if (arr_g.indexOf(id) != -1) {
                arr_g.splice(arr_g.indexOf(id), 1)
            }
        }
        finishAttempt();
    } else {
        if (action == 'drop') {
            if (dropZone == 'eje') {
                if (b_eje.indexOf(id) == -1) {
                    errores += 1;
                }
            } else if (dropZone == 'jud') {
                if (b_jud.indexOf(id) == -1) {
                    errores += 1;
                }
            } else if (dropZone == 'leg') {
                if (b_leg.indexOf(id) == -1) {
                    errores += 1;
                }
            }
            $('#'+id).addClass('wrong');
            $('.back[data-id=' + id + ']').addClass('wrong')
            if (arr_b.indexOf(id) == -1) {
                arr_b.push(id);
            }
            restartAttempt(errores);
        } else if (action == 'leave') {
            if (arr_b.indexOf(id) != -1) {
                arr_b.splice(arr_b.indexOf(id), 1)
            }
        }
    }
    if (b_eje.length != 0 && b_jud.length == 0 && b_leg.length == 0) {
        $('#image').addClass('bad');
        if ($(triangule).hasClass('bejejud')) {
            $(triangule).removeClass('bejejud');
        }
        if ($(triangule).hasClass('bejeleg')) {
            $(triangule).removeClass('bejeleg');
        } 
        $(triangule).addClass(animation + ' beje');
        setTimeout(function () {
            $(triangule).removeClass(animation)
        }, 1000)
    } else if (b_eje.length == 0 && b_jud.length != 0 && b_leg.length == 0) {
        $('#image').addClass('bad');
        if ($(triangule).hasClass('bejejud')) {
            $(triangule).removeClass('bejejud');
        }
        if ($(triangule).hasClass('bjudleg')) {
            $(triangule).removeClass('bjudleg');
        }
        $(triangule).addClass(animation + ' bjud');
        setTimeout(function () {
            $(triangule).removeClass(animation)
        }, 1000)
    } else if (b_eje.length == 0 && b_jud.length == 0 && b_leg.length != 0) {
        $('#image').addClass('bad');
        if ($(triangule).hasClass('bejeleg')) {
            $(triangule).removeClass('bejeleg');
        } 
        if ($(triangule).hasClass('bjudleg')) {
            $(triangule).removeClass('bjudleg');
        }
        $(triangule).addClass(animation + ' bleg');
        setTimeout(function () {
            $(triangule).removeClass(animation)
        }, 1000)
    } else if (b_eje.length != 0 && b_jud.length != 0 && b_leg.length == 0) {
        $('#image').addClass('bad');
        if ($(triangule).hasClass('beje')) {
            $(triangule).removeClass('beje')
        }
        if ($(triangule).hasClass('bjud')) {
            $(triangule).removeClass('bjud')
        }
        $(triangule).addClass(animation + ' bejejud');
        setTimeout(function () {
            $(triangule).removeClass(animation)
        }, 1000)
    } else if (b_eje.length != 0 && b_jud.length == 0 && b_leg.length != 0) {
        $('#image').addClass('bad');
        if ($(triangule).hasClass('beje')) {
            $(triangule).removeClass('beje')
        }
        if ($(triangule).hasClass('bleg')) {
            $(triangule).removeClass('bleg')
        }
        $(triangule).addClass(animation + ' bejeleg');
        setTimeout(function () {
            $(triangule).removeClass(animation)
        }, 1000)
    } else if (b_eje.length == 0 && b_jud.length != 0 && b_leg.length != 0) {
        $('#image').addClass('bad');
        if ($(triangule).hasClass('bjud')) {
            $(triangule).removeClass('bjud')
        }
        if ($(triangule).hasClass('bleg')) {
            $(triangule).removeClass('bleg')
        }
        $(triangule).addClass(animation + ' bjudleg');
        setTimeout(function () {
            $(triangule).removeClass(animation)
        }, 1000)
    } else {
        $('#image').removeClass('bad');
        if ($(triangule).hasClass('beje')) {
            $(triangule).removeClass('beje');
            $(triangule).addClass(animation);
            setTimeout(function () {
                $(triangule).removeClass(animation)
            }, 1000)
        } else if ($(triangule).hasClass('bjud')) {
            $(triangule).removeClass('bjud');
            $(triangule).addClass(animation);
            setTimeout(function () {
                $(triangule).removeClass(animation)
            }, 1000)
        } else if ($(triangule).hasClass('bleg')) {
            $(triangule).removeClass('bleg');
            $(triangule).addClass(animation);
            setTimeout(function () {
                $(triangule).removeClass(animation)
            }, 1000)
        } else if ($(triangule).hasClass('bejejud')) {
            $(triangule).removeClass('bejejud');
            $(triangule).addClass(animation);
            setTimeout(function () {
                $(triangule).removeClass(animation)
            }, 1000)
        } else if ($(triangule).hasClass('bjudleg')) {
            $(triangule).removeClass('bjudleg');
            $(triangule).addClass(animation);
            setTimeout(function () {
                $(triangule).removeClass(animation)
            }, 1000)
        }
    }
}

function restartAttempt(errores) {
    if (errores >= 3) {
        $('#btnModalExit').click()
    }
}

function finishAttempt() {
    if ((g_eje.length + g_jud.length + g_leg.length) == 9){
        $('#btnModalCongrats').click()
    }
}