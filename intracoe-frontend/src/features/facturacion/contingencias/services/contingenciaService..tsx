import { Contingencias, FilterContingencia } from '../interfaces/contingenciaInterfaces';
import { api } from '../../../../shared/services/api';

export const GetAlEventosContingencia = async (
  page: number,
  filters: FilterContingencia
): Promise<Contingencias | null> => {
  try {
    const params: Record<string, any> = { page };

    // Recibido MH: debe enviarse 'True' o 'False'
    if (filters.recibido_mh !== null) {
      params.recibido_mh = filters.recibido_mh ? 'True' : 'False';
    }

    // Sello de recepción (texto)
    if (filters.sello_recepcion) {
      params.sello_recepcion = filters.sello_recepcion;
    }

    // Has sello recepción: debe enviarse 'yes' o 'no'
    if (filters.has_sello_recepcion !== null) {
      params.has_sello_recepcion = filters.has_sello_recepcion ? 'yes' : 'no';
    }

    // Tipo DTE (numérico)
    if (filters.tipo_dte !== null) {
      params.tipo_dte = filters.tipo_dte;
    }

    const response = await api.get<Contingencias>('/contingencia/', {
      params,
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('API Contingencias:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al solicitar contingencias:', error);
    return null;
  }
};

export const enviarEventoContingencia = async (
  contingencia_id: number
): Promise<any | null> => {
  try {
    const response = await api.get<any>(
      '/contingencia/unificado/',
      {
        params: { contingencia_id }
      }
    );

    console.log('Respuesta unificada:', response.data);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
