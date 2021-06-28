import React from "react";
import { logoExport } from '../services/logo'
import { dateHoje } from '../Vacina/ListaAplicadores'
import $ from 'jquery';
import JSZip from 'jszip';
import pdfMake from "pdfmake/build/pdfmake";
import 'datatables.net-responsive-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = JSZip;
$.DataTable = require('datatables.net-bs4');

